"use client";

import { useEffect, useRef, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { AnimationContainer } from "@/(protected)/signin/components/signin-content/animation-container";
import { useSigninDataStore } from "@/(protected)/signin/lib/stores/use-signin-data-store";
import { useKakaoLoader } from "@/lib/utils/kakao-map";

export const LocationStep = () => {
  useKakaoLoader();
  const { data: signinData, setData: setSigninData } = useSigninDataStore();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const geocoderRef = useRef<kakao.maps.services.Geocoder | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<{
    full: string;
    city: string;
    gu: string;
  } | null>(
    signinData.city && signinData.gu
      ? {
          full: `${signinData.city} ${signinData.gu}`,
          city: signinData.city,
          gu: signinData.gu,
        }
      : null
  );
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });

  const handleMapClick = useRef<((mouseEvent: any) => void) | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSearchingRef = useRef<boolean>(false);
  const lastSearchedCoordsRef = useRef<{ lat: number; lng: number } | null>(null);

  const handleMapCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;
    geocoderRef.current = new kakao.maps.services.Geocoder();

    // 초기 마커를 지도 중앙에 생성
    const center = map.getCenter();
    if (!markerRef.current) {
      markerRef.current = new kakao.maps.Marker({
        position: center,
        map: map,
      });
    }

    // 지도 중심이 변경될 때마다 마커를 중앙으로 이동 (즉시)
    kakao.maps.event.addListener(map, "center_changed", () => {
      if (markerRef.current && mapRef.current) {
        const newCenter = mapRef.current.getCenter();
        markerRef.current.setPosition(newCenter);
      }
    });

    kakao.maps.event.addListener(map, "idle", () => {
      if (mapRef.current && !isSearchingRef.current) {
        // 기존 타이머가 있으면 취소
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        // 300ms 후에 주소 검색 (드래그가 완전히 끝난 후)
        debounceTimerRef.current = setTimeout(() => {
          if (mapRef.current && !isSearchingRef.current) {
            const center = mapRef.current.getCenter();
            const lat = center.getLat();
            const lng = center.getLng();

            // 마지막으로 검색한 좌표와 거리가 충분히 멀 때만 검색 (약 10m 이상)
            const shouldSearch =
              !lastSearchedCoordsRef.current ||
              Math.abs(lastSearchedCoordsRef.current.lat - lat) > 0.0001 ||
              Math.abs(lastSearchedCoordsRef.current.lng - lng) > 0.0001;

            if (shouldSearch) {
              searchAddressFromCoords(lat, lng, false); // false = 지도 중심 변경하지 않음
            }
          }
        }, 300);
      }
    });

    handleMapClick.current = (mouseEvent: any) => {
      const latlng = mouseEvent.latLng;
      if (latlng) {
        searchAddressFromCoords(latlng.getLat(), latlng.getLng());
      }
    };

    kakao.maps.event.addListener(map, "click", handleMapClick.current);

    searchAddressFromCoords(center.getLat(), center.getLng());

    if (signinData.city && signinData.gu && !selectedAddress) {
      const addressQuery = `${signinData.city} ${signinData.gu}`;
      searchAddress(addressQuery);
    }
  };

  const searchAddressFromCoords = (lat: number, lng: number, updateMapCenter: boolean = true) => {
    if (!geocoderRef.current || isSearchingRef.current) return;

    // 이미 검색한 좌표와 거의 같으면 스킵
    if (lastSearchedCoordsRef.current) {
      const latDiff = Math.abs(lastSearchedCoordsRef.current.lat - lat);
      const lngDiff = Math.abs(lastSearchedCoordsRef.current.lng - lng);
      if (latDiff < 0.0001 && lngDiff < 0.0001) {
        return;
      }
    }

    isSearchingRef.current = true;
    lastSearchedCoordsRef.current = { lat, lng };

    const callback = (result: any[], status: kakao.maps.services.Status) => {
      isSearchingRef.current = false;

      if (status === kakao.maps.services.Status.OK && result[0]) {
        const address = result[0].address;
        const roadAddress = result[0].road_address;

        const fullAddress = roadAddress ? roadAddress.address_name : address.address_name;

        const city = address.region_1depth_name || "";
        const gu = address.region_2depth_name || "";

        setSelectedAddress({
          full: fullAddress,
          city,
          gu,
        });

        // updateMapCenter가 true일 때만 지도 중심 변경 (사용자 클릭 등)
        if (updateMapCenter) {
          setMapCenter({ lat, lng });
          if (mapRef.current) {
            mapRef.current.setCenter(new kakao.maps.LatLng(lat, lng));
          }
        }
      }
    };

    geocoderRef.current.coord2Address(lng, lat, callback);
  };

  const searchAddress = (address: string) => {
    if (!geocoderRef.current || !address.trim()) return;

    geocoderRef.current.addressSearch(address, (result: any[], status: kakao.maps.services.Status) => {
      if (status === kakao.maps.services.Status.OK && result[0]) {
        const coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
        const roadAddress = result[0].road_address;
        const addressData = result[0].address;

        const fullAddress = roadAddress ? roadAddress.address_name : addressData.address_name;

        const city = addressData.region_1depth_name || "";
        const gu = addressData.region_2depth_name || "";

        setSelectedAddress({
          full: fullAddress,
          city,
          gu,
        });

        setMapCenter({ lat: coords.getLat(), lng: coords.getLng() });
        if (mapRef.current) {
          mapRef.current.setCenter(coords);
        }
      }
    });
  };

  useEffect(() => {
    const getCurrentLocationAuto = () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          searchAddressFromCoords(lat, lng);

          setMapCenter({ lat, lng });
          if (mapRef.current) {
            mapRef.current.setCenter(new kakao.maps.LatLng(lat, lng));
          }
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    };

    if (!signinData.city || !signinData.gu) {
      getCurrentLocationAuto();
    }
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      setSigninData({
        city: selectedAddress.city,
        gu: selectedAddress.gu,
      });
    }
  }, [selectedAddress, setSigninData]);

  // cleanup: 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <AnimationContainer className="flex flex-col gap-6 w-full h-full px-4">
      <div className="text-center space-y-2 shrink-0">
        <h1 className="text-2xl font-bold text-white">위치를 선택해주세요</h1>
        <p className="text-white/70 text-sm leading-relaxed">
          지도를 클릭하거나 현재 위치를 선택하세요
          <br />더 나은 매칭을 도와드려요.
        </p>
      </div>
      <div className="flex-1 min-h-0 relative rounded-lg overflow-hidden border border-white/10">
        <Map center={mapCenter} level={3} className="w-full h-full" onCreate={handleMapCreate} />
      </div>
    </AnimationContainer>
  );
};
