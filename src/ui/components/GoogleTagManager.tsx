/*
  Google Tag Manager container. Render it inside the root layout's <head>.

  The markup is the snippet Google issued for this container, kept verbatim so
  it can be diffed against the GTM admin if Google reissues it. React 19 hoists
  the async gtm.js tag to the top of <head> on its own; the inline dataLayer
  bootstrap renders where it is placed. The order between them doesn't matter:
  gtm.js adopts an existing dataLayer and replays anything pushed before it
  loaded.
*/

const GTM_CONTAINER_ID = "GTM-MMB28D56";

const GTM_SCRIPT_URL = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;

const DATA_LAYER_BOOTSTRAP = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`;

export function GoogleTagManager() {
  return (
    <>
      <script async src={GTM_SCRIPT_URL} />
      <script dangerouslySetInnerHTML={{ __html: DATA_LAYER_BOOTSTRAP }} />
    </>
  );
}
