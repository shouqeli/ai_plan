# 幻灯片3和4调换计划

## 背景
当前结构：
- **Slide 3**: 竞争对手对比（企业案例）
- **Slide 4**: 五级成熟度模型说明（金字塔+详解）

用户需求：先讲清楚五级模型，再展示竞争对手对比

## 调换方案

### 1. 修改 `index.html`

**Slide 3（现在是"竞争对手"，改为"成熟度模型"）**：
- 保留原有金字塔和详细说明内容
- 移除 radarChart 图表
- 标签从"第一部分（续）"改为"第一部分（续）"但增加说明

**Slide 4（现在是"我们现在在哪里"，改为"竞争对手对比"）**：
- 移除金字塔和 maturity-detail
- 保留企业案例卡片
- 保留 competitorChart
- 标签从"第二部分"改为"第一部分（续）"

### 2. 修改 `js/main.js`

**更新 slideTitles 对象**：
```javascript
const slideTitles = {
    1: '封面',
    2: '为什么（政策）',
    3: '成熟度模型',      // 原：为什么（竞品）
    4: '竞争对手对比',     // 原：我们现在
    5: '我们去哪',
    6: '怎么做',
    7: '投入产出',
    8: '总结'
};
```

**更新图表触发逻辑**：
```javascript
if (slideNum === 3) animateRadarChart();      // radarChart 移到 Slide 3
if (slideNum === 4) animateCompetitorChart(); // competitorChart 移到 Slide 4
```

### 3. 关键文件
- `/Users/garyli/devspace/ai_plan/index.html`
- `/Users/garyli/devspace/ai_plan/js/main.js`

## 验证
1. 打开 `index.html`
2. 按 → 键导航
3. Slide 3 应显示五级成熟度模型（金字塔）
4. Slide 4 应显示竞争对手对比图表
5. 两个图表都应正确动画显示
