/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { LitElement, PropertyValues } from 'lit-element';
/**
 * BaseComponent extends LitElement including ShadowRoot toggle and fireCustomEvent features
 *
 * @export  MgtBaseComponent
 * @abstract
 * @class MgtBaseComponent
 * @extends {LitElement}
 */
export abstract class MgtBaseComponent extends LitElement {
  /**
   * Get ShadowRoot toggle, returns value of _useShadowRoot
   *
   * @static _useShadowRoot
   * @memberof MgtBaseComponent
   */
  public static get useShadowRoot() {
    return this._useShadowRoot;
  }

  /**
   * Set ShadowRoot toggle value
   *
   * @static _useShadowRoot
   * @memberof MgtBaseComponent
   */
  public static set useShadowRoot(value: boolean) {
    this._useShadowRoot = value;
  }

  private static _useShadowRoot: boolean = true;

  constructor() {
    super();
    if (this.isShadowRootDisabled()) {
      (this as any)._needsShimAdoptedStyleSheets = true;
    }
  }

  /**
   * Receive ShadowRoot Disabled value
   *
   * @returns boolean _useShadowRoot value
   * @memberof MgtBaseComponent
   */
  public isShadowRootDisabled() {
    return !MgtBaseComponent._useShadowRoot || !(this.constructor as typeof MgtBaseComponent)._useShadowRoot;
  }

  /**
   * helps facilitate creation of events across components
   *
   * @protected
   * @param {string} eventName name given to specific event
   * @param {*} [detail] optional any value to dispatch with event
   * @returns {boolean}
   * @memberof MgtBaseComponent
   */
  protected fireCustomEvent(eventName: string, detail?: any): boolean {
    const event = new CustomEvent(eventName, {
      bubbles: false,
      cancelable: true,
      detail
    });
    return this.dispatchEvent(event);
  }
  /**
   * method to create ShadowRoot if disabled flag isn't present
   *
   * @protected
   * @returns boolean
   * @memberof MgtBaseComponent
   */
  protected createRenderRoot() {
    return this.isShadowRootDisabled() ? this : super.createRenderRoot();
  }

  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param changedProperties Map of changed properties with old values
   */
  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    const event = new CustomEvent('updated', {
      bubbles: true,
      cancelable: true
    });
    this.dispatchEvent(event);
  }
}
