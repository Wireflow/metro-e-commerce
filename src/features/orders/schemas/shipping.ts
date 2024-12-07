export const trackingUrlMap: TrackingURLMap = {
  UPS: tracking => `https://www.ups.com/track?tracknum=${tracking}`,
  USPS: tracking => `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking}`,
  FedEx: tracking => `https://www.fedex.com/fedextrack/?trknbr=${tracking}`,
  DHL: tracking => `https://www.dhl.com/en/express/tracking.html?AWB=${tracking}`,
  'Amazon Logistics': tracking => `https://track.amazon.com/tracking/${tracking}`,
  OnTrac: tracking => `https://www.ontrac.com/tracking.asp?tracking=${tracking}`,
  // Add more carriers as needed
};

type TrackingURLMap = {
  [key: string]: (trackingNumber: string) => string;
};

export const getTrackingUrl = (
  provider?: string | null,
  trackingNumber?: string | null
): string => {
  if (!provider || !trackingNumber) return '';

  // Default to Google search if provider isn't in our map
  const defaultSearch = (tracking: string) =>
    `https://www.google.com/search?q=${encodeURIComponent(`${provider} tracking ${tracking}`)}`;

  const getTrackingLink = trackingUrlMap[provider] || defaultSearch;
  return getTrackingLink(trackingNumber);
};
