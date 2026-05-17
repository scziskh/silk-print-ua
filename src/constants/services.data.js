export const silkScreenData = {
  sectionKey: 'SilkScreenSection',
  href: '/services/silk-screen-printing',
  galleryItems: [
    { id: 'pantone', src: '/assets/services/vizitki-pantonami.webp' },
    { id: 'gold', src: '/assets/services/vizitki-zolotom.webp' },
    { id: 'white', src: '/assets/services/vizitki-beloy-kraskoy.webp' },
    { id: 'varnish', src: '/assets/services/vizitki-lakom.webp' },
  ],
  textBlocks: ['pantone', 'metallic', 'white', 'varnish'],
};

export const foilStampingData = {
  sectionKey: 'FoilStampingSection',
  href: '/services/foil-stamping',
  galleryItems: [
    { id: 'gold', src: '/assets/services/vizitki-tisnenie-zolotom.webp' },
    { id: 'silver', src: '/assets/services/vizitki-tisnenie-serebrom.webp' },
    { id: 'color', src: '/assets/services/vizitki-tisnenie-cvetnoy-folgoy.webp' },
    { id: 'holographic', src: '/assets/services/vizitki-tisnenie-golograficheskoy-folgoy.webp' },
  ],
  textBlocks: ['gold', 'silver', 'color', 'holographic'],
};

export const stampingData = {
  sectionKey: 'StampingSection',
  href: '/services/stamping',
  galleryItems: [
    { id: 'over_print', src: '/assets/services/vizitki-tisnenie-poverh-pechati.webp' },
    { id: 'blind', src: '/assets/services/vizitki-slepoye-tisneniye.webp' },
  ],
  textBlocks: ['over_print', 'blind'],
};

export const plasticCardsData = {
  sectionKey: 'PlasticCardsSection',
  href: '/services/plastic-cards',
  galleryItems: [
    { id: 'plastic', src: '/assets/services/vizitki-plastikoviye.webp' },
    { id: 'transparent', src: '/assets/services/vizitki-prozrachniye.webp' },
  ],
  textBlocks: ['plastic', 'transparent'],
};

export const layeringData = {
  sectionKey: 'LayeringSection',
  href: '/services/layering',
  galleryItems: [
    { id: 'duplex', src: '/assets/services/vizitki-duplex.webp' },
    { id: 'triplex', src: '/assets/services/vizitki-triplex.webp' },
  ],
  textBlocks: ['duplex', 'triplex'],
};

export const dieCuttingData = {
  sectionKey: 'DieCuttingSection',
  href: '/services/die-cutting',
  galleryItems: [
    { id: 'inner_cutting', src: '/assets/services/vizitki-s-visechkoy-vnutri.webp' },
    { id: 'custom_shape', src: '/assets/services/vizitki-unikalnoy-formi.webp' },
  ],
  textBlocks: ['inner_cutting', 'custom_shape'],
};

export const uvVarnishData = {
  sectionKey: 'UvVarnishSection',
  href: '/services/uv-varnish',
  galleryItems: [
    { id: 'volume_paint', src: '/assets/services/vizitki-s-termografiyey.webp' },
    { id: 'uv_varnish', src: '/assets/services/vizitki-objemnimi-kraskami.webp' },
  ],
  textBlocks: ['volume_paint', 'uv_varnish'],
};

export const allServicesData = [silkScreenData, foilStampingData, stampingData, plasticCardsData, layeringData, dieCuttingData, uvVarnishData];
