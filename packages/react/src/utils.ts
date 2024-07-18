import React from 'react'

const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function camelCase(str: string) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase())
}

function convertStyleStringToObject(styleString: string) {
  return styleString.split(';').reduce((styleObject: { [key: string]: string }, styleProperty) => {
    let [key, value] = styleProperty.split(':')
    key = key?.trim()
    value = value?.trim()
    if (key && value) {
      styleObject[camelCase(key)] = value
    }
    return styleObject
  }, {})
}

/**
 * Recursively converts HTML attributes in a React element tree to their JSX property names.
 *
 * @param {React.ReactElement} element The React element to process.
 * @return {React.ReactElement} A new React element with converted attributes.
 */
export function convertAttributesInElement(element: React.ReactElement): React.ReactElement {
  // Base case: if the element is not a React element, return it unchanged.
  if (!React.isValidElement(element)) {
    return element;
  }

  // Convert attributes of the current element.
  const attributeMap: { [key: string]: string } = {
    class: 'className',
    for: 'htmlFor',
    targetAttr: 'targetattr',
    // Add more attribute conversions here as needed
  };

  const newProps: { [key: string]: unknown } = Object.keys((element.props as Record<string, unknown>)).reduce((acc: { [key: string]: unknown }, key) => {
    let value = (element.props as Record<string, unknown>)[key];

    if (key === 'style' && typeof value === 'string') {
      value = convertStyleStringToObject(value);
    }

    const mappedKey = attributeMap[key] || key;
    acc[mappedKey] = value;
    return acc;
  }, {});
  
  // Process children recursively, unless the element is a void element.
  const children = VOID_ELEMENTS.has(element.type as string) ? undefined : React.Children.map((element.props as React.PropsWithChildren).children, child => convertAttributesInElement(child as React.ReactElement));

  // Clone the element with the new properties and updated children.
  return React.createElement(element.type, {...newProps, id: element.key}, children);
}
