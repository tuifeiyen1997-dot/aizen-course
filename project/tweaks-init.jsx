// tweaks-init.jsx
// AIZen Landing Page — Tweaks控制
// 控制主色配色、CTA 文案、Hero 版型、痛點區呈現

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "colorMode": "blue-led",
  "ctaText": "立即報名",
  "heroLayout": "split",
  "painLayout": "cards"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  document.body.setAttribute('data-color-mode', t.colorMode);
  const hero = document.querySelector('.hero');
  if (hero) hero.setAttribute('data-layout', t.heroLayout);
  const pain = document.querySelector('.pain');
  if (pain) pain.setAttribute('data-layout', t.painLayout);
  if (window.__syncCtaLabel) window.__syncCtaLabel(t.ctaText);
}

function AizenTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyTweaks(t);
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="主色配色" />
      <TweakRadio
        label="色彩模式"
        value={t.colorMode}
        options={[
          { value: "blue-led", label: "藍主導" },
          { value: "red-led", label: "紅主導" },
          { value: "balanced", label: "雙色平衡" },
        ]}
        onChange={(v) => setTweak('colorMode', v)}
      />

      <TweakSection label="Hero 版型" />
      <TweakRadio
        label="排版"
        value={t.heroLayout}
        options={[
          { value: "split", label: "左右分欄" },
          { value: "centered", label: "置中" },
          { value: "fullbleed", label: "全寬" },
        ]}
        onChange={(v) => setTweak('heroLayout', v)}
      />

      <TweakSection label="CTA 文案" />
      <TweakSelect
        label="按鈕文字"
        value={t.ctaText}
        options={[
          "立即報名",
          "預約席位",
          "解鎖課程",
          "加入春季班",
          "搶下早鳥名額",
        ]}
        onChange={(v) => setTweak('ctaText', v)}
      />

      <TweakSection label="痛點區呈現" />
      <TweakRadio
        label="樣式"
        value={t.painLayout}
        options={[
          { value: "cards", label: "卡片" },
          { value: "dialogue", label: "對話" },
          { value: "story", label: "故事" },
        ]}
        onChange={(v) => setTweak('painLayout', v)}
      />
    </TweaksPanel>
  );
}

// On load, apply defaults even if the panel isn't open yet
applyTweaks(TWEAK_DEFAULTS);

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<AizenTweaks />);
