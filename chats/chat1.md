# 線上課程販售頁

_Started 2026-05-21 06:11 UTC_

---

## User

我們預計在官網加入一頁販售線上課程的網頁，請根據品牌guildeline設計一頁銷售網站
我們預計會有的區塊:landing page銷售區塊 放宣傳影片的區塊 購買區塊

landing page銷售區塊參考範例:
https://static.wixstatic.com/media/741b9c_90ec9d44171c4c94813934becbb310e2~mv2.jpg/v1/fill/w_450,h_7048,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/741b9c_90ec9d44171c4c94813934becbb310e2~mv2.jpg

https://www.cwlearning.com.tw/programs/a1f3f3cd-f5f8-43a7-9d35-acd0ff6db4f3

我們的官網:https://www.ai-zen.co/

## Assistant

_[tool: list_files]_

_[tool: list_files]_

_[tool: invoke_skill]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: copy_files]_

_[tool: run_script]_

_[tool: run_script]_

Let me extract images from the brand guideline PDF to see the color palette and logo.

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: questions_v2]_

我已仔細閱讀了品牌規範與課程行銷藍圖。在開始設計之前，想請您確認幾個方向設定：

## User

Questions answered:
- course_price: 尚未定價
- tone_direction: 專業沉穩（白底+品牌藍主導，留白多，類似 Apple/Notion）
- page_layout_density: 長頁高轉換版（15+ 區塊，類似 Wix 參考圖的敘事長頁）
- sections_wanted: 課程價值（上完 8 堂你會變成怎樣的人）, 8 堂課大綱列表, 宣傳影片區, 師資陣容（4 位首發講師）, 學員見證 / 推薦語, 適合對象（中高階主管 persona）, 早鳥倒數 + 購買區, FAQ 常見問題, 補充高階主管痛點（工作壓力大）：體力：憂慮體力不行，跟不上年輕人，大腦都會出問題腦力：害怕阿茲海默症做決策：怕做錯決策、選錯路高壓下做精準決策，害怕溝通、情緒控管：壓力大，溝通上會有碰撞，會後悔工具多，會焦慮，怎麼帶領部署工作情緒不帶回家：影響伴侶、家人
- tweak_focus: 主色配色（品牌紅 vs 品牌藍主導 vs 雙色平衡）, CTA 文案（立即報名 vs 預約席位 vs 解鎖課程）, Hero 區版型（左右分欄 vs 置中 vs 全圖滿版）, 痛點區呈現方式（卡片 vs 對話 vs 故事敘事）
- imagery_strategy: 使用 Unsplash 公開圖庫（自然/辦公情境）模擬實際畫面
- video_placeholder: 影片左、痛點對應重點右（雙欄）

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

太棒了，方向都很清楚。我先確認設計系統，然後開始建構：

**設計方向**
- 配色：白底主導 + 品牌藍 `#0073DF` 為主、品牌紅 `#FF0000` 為點綴重點
- 字體：Noto Sans TC（取代源泉圓體，視覺最接近的免費中文字）+ Inter（英文/數字）
- 調性：專業沉穩、留白、Apple/Notion 風格的長頁敘事
- 結構：15+ 區塊，以中高階主管痛點為敘事主軸

開始建構文件。

_[tool: read_file]_

_[tool: write_file]_

Now let me build the design. First the CSS design system:Now the main HTML file:

_[tool: write_file]_

Now the Tweaks panel:

_[tool: write_file]_

_[tool: grep]_

Let me verify the tweaks-panel API for the option format:

_[tool: read_file]_

_[tool: done]_

_[tool: update_todos]_

_[tool: fork_verifier_agent]_

已完成 AIZen 線上課程銷售長頁。

**設計重點**
- **配色**：白底為主、品牌藍 `#0073DF` 主導、紅色 `#FF0000` 作為高張力點綴（早鳥標籤、痛點符號、CTA）
- **字體**：Noto Sans TC（中文，最接近源泉圓體的免費選擇）+ Inter（英數字）
- **調性**：避開靈性/雞湯/網感，使用「大腦降速」「神經系統重置」「關機能力」等品牌語言
- **長度**：15+ 區塊敘事長頁，痛點區覆蓋你提供的全部 6 大主管焦慮（體力／腦力／決策／溝通／家庭／睡眠）

**頁面結構**
Nav → Hero → 痛點關鍵字跑馬燈 → 6 大痛點區 → 核心 Insight 引言 → 8 週 Transformation → 8 堂課大綱 → 宣傳影片（左影右點對應） → 科學依據 → 4 位首發師資 → 適合對象 → 6 則學員見證（含外商副總引述） → vs 一般冥想 App 比較表 → 早鳥倒數 + 購買區 → FAQ → 結尾 CTA → Footer

**Tweaks 切換器**（右下角）
- **主色配色**：藍主導 / 紅主導 / 雙色平衡
- **Hero 版型**：左右分欄 / 置中 / 全寬
- **CTA 文案**：立即報名 / 預約席位 / 解鎖課程 / 加入春季班 / 搶下早鳥名額
- **痛點區呈現**：卡片 / 對話泡泡 / 故事時間軸

**待補項目**
- 課程定價（價格區現顯示「— 待定價 —」placeholder，告知後可立即填入）
- 真實師資介紹、學員見證、宣傳影片
- 替換 Unsplash 圖庫為真實課堂／講師照片

需要我先調整哪個區塊？或想加入企業團報、結業證書、學員前後對比數據等延伸內容嗎？

## User

Save this design as a PDF: index.html

## Assistant

_[tool: read_file]_

_[tool: copy_files]_

_[tool: str_replace_edit]_

Now remove the interactive Babel/React tweaks scripts and add the auto-print script:

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: str_replace_edit]_

Now let me verify the print page loads cleanly:

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

Clean. Now opening the print dialog:

_[tool: open_for_print]_

已開啟列印視窗。若沒有自動跳出，請點此手動開啟：[開啟列印版頁面](https://dad7e678-bae3-4890-be50-9dd99ae803ff.claudeusercontent.com/v1/design/projects/dad7e678-bae3-4890-be50-9dd99ae803ff/serve/index-print.html?t=32d0ab07edcffad7d6fc8e6685d9ec7d85e983f9aa3af8a88eb7f785e167a5b9.adcf3ab3-fe47-456a-8a36-d0738ed48baf.3eebc2bb-e9c9-4b3a-94cb-51417e071180.1779360692&direct=1)，在跳出的列印對話框中選「另存為 PDF」即可。

## User

Save as standalone HTML: index.html

## Assistant

_[tool: copy_files]_

_[tool: str_replace_edit]_

_[tool: super_inline_html]_

_[tool: str_replace_edit]_

_[tool: super_inline_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: present_fs_item_for_download]_

已打包為單一離線檔案（含全部字體、圖片與互動 Tweaks 面板，約 8.5MB）。點上方下載卡即可儲存。

## User

Save as standalone HTML: index.html

## Assistant

_[tool: present_fs_item_for_download]_

已重新提供下載連結（內容與上次相同：完整離線單檔，含全部圖片、字體與互動 Tweaks 面板）。

## User

Save as standalone HTML: index.html

## User

Save this design as a PDF: index.html

## User

Save this design as a PDF: index.html

## Assistant

_[tool: open_for_print]_

已開啟列印視窗。若沒跳出，請點此手動開啟：[開啟列印版頁面](https://dad7e678-bae3-4890-be50-9dd99ae803ff.claudeusercontent.com/v1/design/projects/dad7e678-bae3-4890-be50-9dd99ae803ff/serve/index-print.html?t=bdbbaa941a05eddc4c9f66021fa8629851e197261baff5a8f1eb4c2ead6805e1.adcf3ab3-fe47-456a-8a36-d0738ed48baf.3eebc2bb-e9c9-4b3a-94cb-51417e071180.1779417656&direct=1)，於跳出的列印對話框選「另存為 PDF」即可。

## User

Save this design as a PDF: index.html

## Assistant

_[tool: open_for_print]_

已開啟。若沒跳出，請點此手動開啟：[開啟列印版頁面](https://dad7e678-bae3-4890-be50-9dd99ae803ff.claudeusercontent.com/v1/design/projects/dad7e678-bae3-4890-be50-9dd99ae803ff/serve/index-print.html?t=bdbbaa941a05eddc4c9f66021fa8629851e197261baff5a8f1eb4c2ead6805e1.adcf3ab3-fe47-456a-8a36-d0738ed48baf.3eebc2bb-e9c9-4b3a-94cb-51417e071180.1779417656&direct=1)，於列印對話框選「另存為 PDF」即可。

## User

Save as standalone HTML: index.html

## Assistant

_[tool: present_fs_item_for_download]_

已準備好離線單檔下載（含全部圖片、字體、互動 Tweaks 面板）。

## User

Apply drawing

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

I'll update the price card with the actual price ($8,800), and add a complete registration form with name/email/phone + 3 installment options.Now add the CSS for the form, and a small JS handler:

_[tool: str_replace_edit]_

Now adjust the price-display so it changes when user picks an installment option, and update the responsive breakpoint:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

報名表單已加入購買區，包含：

- **基本資料**：姓名、Email、聯絡電話（含必填標示與表單驗證）
- **付款方式**：3 張可選卡片
  - 分 3 期：每期 NT$ 2,934
  - 分 6 期：每期 NT$ 1,467
  - 一次付清：NT$ 8,800（預設選中、標示「推薦」）
- **服務條款同意勾選**
- **價格區會動態跟隨選項變動**（選 3 期會顯示 `2,934 × 3`）

原價標示也補上：原價 NT$ 12,800、早鳥省 31%。

## User

Save as standalone HTML: index.html

## Assistant

_[tool: delete_file]_

_[tool: copy_files]_

_[tool: str_replace_edit]_

_[tool: super_inline_html]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: super_inline_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: present_fs_item_for_download]_

已打包為完整離線單檔（8.5MB，含全部圖片、字體與互動功能）。

