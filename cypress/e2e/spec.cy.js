describe('Test Mondrian', () => {
  it('test [몬드리안 테스트] page', () => {
    cy.visit('/');

    // 몬드리안 테스트 페이지 방문
    cy.contains('몬드리안 테스트').click();

    cy.url().should('include', '/js-api/mondrian.html');

    // Maps JS API가 불러져왔는지 확인
    // google.maps.Map가 존재한다면 성공
    cy.wait(2000);

    cy.window().should('have.property', 'google')
      .and('have.property', 'maps')
      .and('have.property', 'Map')
      .then((Map) => {
        cy.wrap(Map).as('Map');
      });

    // 위성 지도 타입 테스트
    cy.get('#satellite-btn').click();
    cy.window().then((win) => {
      expect(win.map.getMapTypeId()).to.equal('satellite');
    });

    // 하이브리드 지도 타입 테스트
    cy.get('#hybrid-btn').click();
    cy.window().then((win) => {
      expect(win.map.getMapTypeId()).to.equal('hybrid');
    });

    // 지형정보 지도 타입 테스트
    cy.get('#terrain-btn').click();
    cy.window().then((win) => {
      expect(win.map.getMapTypeId()).to.equal('terrain');
    });

    // SNU 장학빌딩 마커 생성
    cy.window().then((win) => {
      new win.google.maps.Marker({
        position: new win.google.maps.LatLng(37.542465, 126.95),
        map: win.map,
      });
    });

    // 쿼리에서 장소 찾기: 마포 우체국
    cy.window().then((win) => {
      
      const request = {
        query: '마포 우체국',
        fields: ["name", "geometry"],
      };
      new win.google.maps.places.PlacesService(win.map).findPlaceFromQuery(request, function (results, status) {
        if (status === win.google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            new win.google.maps.Marker({
              position: results[i].geometry.location,
              map: win.map,
              title: results[i].name,
            });
          }
          win.map.setCenter(results[0].geometry.location);
        }
      });
    });

    // 캄팔라에서 나이로비 길 찾기
    cy.window().then((win) => {
      const fromLatLng = { lat: 0.33155226987432335, lng: 32.578180987282636 };
      const toLatLng = { lat: -1.3070491855381845, lng: 36.81871450540919 };

      new win.google.maps.DirectionsService().route(
        {
          origin: {
            query: fromLatLng.lat + "," + fromLatLng.lng,
          },
          destination: {
            query: toLatLng.lat + "," + toLatLng.lng,
          },
          travelMode: win.google.maps.TravelMode.DRIVING,
        },
        (res, status) => {
          if (status === "OK") {
            new win.google.maps.DirectionsRenderer().setDirections(res);
          } else {
            throw new Error();
          }
        }
      );
    });

    // 지오코딩
    cy.window().then((win) => {
      new win.google.maps.Geocoder().geocode({ address: '광화문' }, (res, status) => {
        if (status === "OK") {
          const location = res[0].geometry.location;
          new win.google.maps.Marker({
            map: win.map,
            position: location,
          });

          win.map.setCenter(location);
          win.map.setZoom(15);
        } else {
          throw new Error('지오코딩 실패');
        }
      });
    });
  });
})