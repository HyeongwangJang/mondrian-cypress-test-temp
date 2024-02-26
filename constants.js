const LAT_LNG = {
  korea: {
    SNU: { lat: 37.542465, lng: 126.950916 }, // snu 장학빌딩
    탑클라우드: { lat: 37.543255, lng: 126.951528 },
    마포우체국: { lat: 37.543177, lng: 126.949864 },
  },

  kampala: { lat: 0.33155226987432335, lng: 32.578180987282636 },
  nairobi: { lat: -1.3070491855381845, lng: 36.81871450540919 },
}

const PLACE_IDS = {
  korea: {
    용산구_라움미술관: 'ChIJ3cbHPbOjfDURHmxn5rKSSMc',
    용산구_해밀톤호텔: 'ChIJ9-oBRUqifDUR95YLaiGPL3Q',
  },
  australia: {
    emporiumHotelSouthBank: 'ChIJG5vaUgxakWsRVKPi6iVlXq8',
    carinaLeaguesClub: 'ChIJS_feAfBbkWsRo7K91wKVKCU',
  }
}

/**
 * 배열에서 특정 element 제거
 * @param {Array} array 배열
 * @param {unknown} el 제거할 값
 */
function removeElementFromArray(array, el) {
  const index = array.indexOf(el);
  if (index > -1) { // only splice array when item is found
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
}