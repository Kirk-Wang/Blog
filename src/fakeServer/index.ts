/**
 *  Copyright Kirk Technologies.
 */

import FakeRest from "fakerest";
import fetchMock from "fetch-mock";
import { generateData } from "./data-generator";

export const fakeServer = () => {
    const data = generateData({ serializeDate: true });
    const restServer = new FakeRest.FetchServer("http://api.fakeserver.com");
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }
    restServer.init(data);
    restServer.toggleLogging(); // logging is off by default, enable it
    fetchMock.mock("begin:http://api.fakeserver.com", restServer.getHandler());
    return () => fetchMock.restore();
};
