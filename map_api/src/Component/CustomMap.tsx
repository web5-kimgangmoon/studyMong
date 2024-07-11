import { useRef, useState } from "react";
import { Map, MapTypeControl } from "react-kakao-maps-sdk";
import useKakaoLoader from "./../hooks/useKakaoLoader";

const CustomMap = (): JSX.Element => {
  useKakaoLoader();
  const mapRef = useRef<kakao.maps.Map>(null);
  const [info, setInfo] = useState<string>("");

  const getInfo = () => {
    const map = mapRef.current;
    if (!map) return;
    const center = map.getCenter();
    const level = map.getLevel();
    const mapTypeId = map.getMapTypeId();
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    const boundsStr = bounds.toString();
    const mapProjection = map.getProjection();
    let congnamul = mapProjection
      .coordsFromPoint(new kakao.maps.Point(0, 0))
      .toCoords();
    let congnamul2 = mapProjection
      .coordsFromPoint(new kakao.maps.Point(1, 0))
      .toCoords();
    let congnamul3 = mapProjection
      .coordsFromPoint(new kakao.maps.Point(2, 0))
      .toCoords();
    let congnamul4 = mapProjection
      .coordsFromPoint(new kakao.maps.Point(10, 0))
      .toCoords();
    // let point = mapProjection.coordsFromPoint(new kakao.maps.Point(0, 0));
    // let point2 = mapProjection.coordsFromPoint(new kakao.maps.Point(1, 0));
    // let point3 = mapProjection.coordsFromPoint(new kakao.maps.Point(0, 2));
    let message = "지도 중심좌표는 위도 " + center.getLat() + ", <br>";
    message += "경도 " + center.getLng() + " 이고 <br>";
    message += "지도 레벨은 " + level + " 입니다 <br> <br>";
    message += "지도 타입은 " + mapTypeId + " 이고 <br> ";
    message +=
      "지도의 남서쪽 좌표는 " +
      swLatLng.getLat() +
      ", " +
      swLatLng.getLng() +
      " 이고 <br>";
    message +=
      "북동쪽 좌표는 " +
      neLatLng.getLat() +
      ", " +
      neLatLng.getLng() +
      " 입니다";
    message += "<br> 현재 좌표의 x와 y는" + congnamul.toString() + "입니다";
    message += "<br> x에 1더한 값은" + congnamul2.toString() + "입니다";
    message += "<br> x에 2더한 값은" + congnamul3.toString() + "입니다";
    message += "<br> x에 10더한 값은" + congnamul4.toString() + "입니다";
    setInfo(message);
    console.log(message);
  };

  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
      style={{ width: "100%", height: "350px" }} // 지도 크기
      level={3} // 지도 확대 레벨
      ref={mapRef}
    >
      <MapTypeControl position={"TOPRIGHT"} />
      <button id="getInfoBtn" onClick={getInfo}>
        맵정보 가져오기
      </button>
      <p
        id="info"
        dangerouslySetInnerHTML={{
          __html: info,
        }}
      ></p>
    </Map>
  );
};

export default CustomMap;
