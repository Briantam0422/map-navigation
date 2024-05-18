(global as any).google = {
  maps: {
    Map: jest.fn(),
    Marker: jest.fn(),
    DirectionsService: jest.fn(),
    DirectionsRenderer: jest.fn(),
    TravelMode: {
      DRIVING: "DRIVING",
    },
    MapTypeId: {
      ROADMAP: "ROADMAP",
    },
    DirectionsStatus: {
      OK: "OK",
    },
    DirectionsRequest: jest.fn(),
    DirectionsResult: jest.fn(),
  },
};
