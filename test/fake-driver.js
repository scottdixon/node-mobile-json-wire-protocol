import { errors } from '../..';
import _ from 'lodash';
import { MobileJsonWireProtocol } from '../..';

class FakeDriver extends MobileJsonWireProtocol {

  constructor () {
    super();
    this.sessionId = null;
    this.jwpProxyActive = false;
  }

  sessionExists (sessionId) {
    if (!sessionId) return false;
    return sessionId === this.sessionId;
  }

  async createSession (desiredCapabilities, requiredCapabilities={}) {
    this.sessionId = "1234";
    this.desiredCapabilities = desiredCapabilities;
    this.requiredCapabilities = requiredCapabilities;
    return [this.sessionId, _.extend({}, desiredCapabilities, requiredCapabilities)];
  }

  async execute (cmd, ...args) {
    if (!this[cmd]) {
      throw new errors.NotYetImplementedError();
    }
    return await this[cmd](...args);
  }

  async deleteSession () {
    this.sessionId = null;
  }

  async getStatus () {
    return "I'm fine";
  }

  async setUrl (url) {
    return `Navigated to: ${url}`;
  }

  async getUrl () {
    return "http://foobar.com";
  }

  async back (sessionId) {
    return sessionId;
  }

  async forward () {}

  async refresh () {
    throw new Error('Too Fresh!');
  }

  async getSession () {
    throw new errors.NoSuchDriverError();
  }

  async click (elementId, sessionId) {
    return [elementId, sessionId];
  }

  async implicitWait (ms) {
    return ms;
  }

  async clickCurrent (button) {
    return button;
  }

  async setNetworkConnection (type) {
    return type;
  }

  async moveTo (element, xOffset, yOffset) {
    return [element, xOffset, yOffset];
  }

  async getText () {
    return "";
  }

  async getAttribute (attr, elementId, sessionId) {
    return [attr, elementId, sessionId];
  }

  async performTouch (...args) {
    return args;
  }


}

export { FakeDriver };
