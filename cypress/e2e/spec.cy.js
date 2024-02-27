describe('Test Mondrian', () => {
  before(() => {
    cy.intercept('POST', 'https://mondrian.sphinfo.co.kr:9443/$rpc/google.internal.maps.mapsjs.v1.MapsJsInternalService/GetViewportInfo').as('getViewportRequest');

    cy.visit('/');

    cy.contains('몬드리안 테스트').click();

    cy.url().should('include', '/js-api/mondrian.html');

  })

  it('GetViewportInfo must success', () => {
    cy.wait('@getViewportRequest').its('response.statusCode').should('eq', 200); // now is intercepted

    cy.wait(1000);
  });

  // 구글 맵 객체 확인
  it('It must have google.maps.Map property', () => {
    // Maps JS API가 불러져왔는지 확인
    // google.maps.Map가 존재한다면 성공
    cy.wait(1500);

    cy.window().should('have.property', 'google')
      .and('have.property', 'maps')
      .and('have.property', 'Map')
      .then((Map) => {
        cy.wrap(Map).as('Map');
      });

    cy.wait(1000);
  });

  // // 위성 지도 타입 테스트
  it('Map should be changed into satellite type', () => {
    cy.intercept('GET', 'https://mondrian.sphinfo.co.kr:9443/google/jsapi/res/hskhms1_googleapis/kh**').as('stTileRequest');

    cy.get('#satellite-btn').click();
    cy.window().then((win) => {
      expect(win.map.getMapTypeId()).to.equal('satellite');
      cy.wait('@stTileRequest').its('response.statusCode').should('eq', 200);
    });
    
    cy.wait(1000);
  });

  // 하이브리드 지도 타입 테스트
  it('Map should be changed into hybrid type', () => {
    cy.intercept('GET', 'https://mondrian.sphinfo.co.kr:9443/google/jsapi/res/hsmaps_google/maps/vt**').as('hbTileRequest');

    cy.get('#hybrid-btn').click();
    cy.window().then((win) => {
      expect(win.map.getMapTypeId()).to.equal('hybrid');
      cy.wait('@hbTileRequest').its('response.statusCode').should('eq', 200);
    });

    cy.wait(1000);
  });

  // 지형정보 지도 타입 테스트
  it('Map should be changed into terrain type', () => {
    cy.intercept('GET', 'https://mondrian.sphinfo.co.kr:9443/google/jsapi/res/hsmaps_google/maps/vt**').as('trTileRequest');

    cy.get('#terrain-btn').click();
    cy.window().then((win) => {
      expect(win.map.getMapTypeId()).to.equal('terrain');
      cy.wait('@trTileRequest').its('response.statusCode').should('eq', 200);
    });

    cy.wait(1000);
  })

  // // SNU 장학빌딩 마커 생성
  it('SNU building marker should be created', () => {
    cy.window().then((win) => {
      new win.google.maps.Marker({
        position: new win.google.maps.LatLng(37.542465, 126.95),
        map: win.map,
      });
    });

    cy.wait(1000);
  });

  // 쿼리에서 장소 찾기: 마포 우체국
  it('Place should be found from query: mapo postoffice', () => {
    cy.intercept('GET', 'https://mondrian.sphinfo.co.kr:9443/maps/api/place/js/PlaceService.FindPlaceFromText**').as('findPlaceFromTextRequest');

    cy.get('#place-btn').click();

    cy.wait('@findPlaceFromTextRequest').its('response.statusCode').should('eq', 200);

    cy.wait(1000);
  });

  // 캄팔라에서 나이로비 길 찾기
  it('Direction should be found: from Kampala to Nairobi', () => {
    cy.intercept('GET', 'https://mondrian.sphinfo.co.kr:9443/maps/api/js/DirectionsService.Route**').as('directionRequest');

    cy.get('#direction-btn').click();

    cy.wait('@directionRequest').its('response.statusCode').should('eq', 200);

    cy.wait(1000);
  });
  
  // 지오코딩 테스트
  it('Geocoding test', () => {
    cy.intercept('GET', 'https://mondrian.sphinfo.co.kr:9443/maps/api/js/GeocodeService.Search**').as('geocodingRequest');

    cy.get('#geocoding-btn').click();

    cy.wait('@geocodingRequest').its('response.statusCode').should('eq', 200);

    cy.wait(1000);
  })

  // 그리기 테스트
  it('Triangle must be created', () => {
    cy.get('#triangle-btn').click();

    cy.wait(1000);
  })
})
