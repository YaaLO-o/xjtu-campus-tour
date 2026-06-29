/**
 * XJTU 智慧校园游 — 主逻辑模块
 * 页面初始化、返回顶部、导航效果、天气、搜索、分类筛选、景点详情
 */

document.addEventListener('DOMContentLoaded', function () {
  // 初始化地图
  initMap();

  // 返回顶部
  initBackToTop();

  // 导航栏滚动效果
  initNavScroll();

  // 天气功能
  initWeather();

  // 分类标签
  initCategoryBar();

  // 校园历史时间线
  initTimeline();

  // 搜索功能
  initSearch();
});

/**
 * 返回顶部
 */
function initBackToTop() {
  var btn = document.getElementById('myBtn');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * 导航栏滚动效果
 */
function initNavScroll() {
  var nav = document.querySelector('.flex-container');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow =
      window.scrollY > 50
        ? '0 5px 20px rgba(0, 0, 0, 0.1)'
        : '0 2px 15px rgba(0, 0, 0, 0.1)';
  });
}

/**
 * 天气功能
 */
function initWeather() {
  try {
    AMap.plugin('AMap.Weather', function () {
      var weather = new AMap.Weather();

      function updateWeather() {
        weather.getLive('西安市', function (err, liveData) {
          if (!err) updateWeatherUI(liveData);
        });
        weather.getForecast('西安市', function (err, forecastData) {
          if (!err) updateForecastUI(forecastData.forecasts);
        });
      }

      function updateWeatherUI(data) {
        if (!data) return;
        var tempEl = document.getElementById('weather-temp');
        var descEl = document.getElementById('weather-desc');
        var windEl = document.getElementById('weather-wind');
        var humidEl = document.getElementById('weather-humidity');
        if (tempEl) tempEl.textContent = data.temperature + '°';
        if (descEl) descEl.textContent = data.weather;
        if (windEl) windEl.textContent = data.windDirection + ' ' + data.windPower + '级';
        if (humidEl) humidEl.textContent = '湿度 ' + data.humidity + '%';

        var iconEl = document.getElementById('weather-icon');
        if (iconEl && data.weather) {
          var t = data.weather.toLowerCase();
          var icon = 'fas fa-sun';
          if (t.includes('雨')) icon = 'fas fa-cloud-rain';
          else if (t.includes('云') || t.includes('阴')) icon = 'fas fa-cloud';
          else if (t.includes('雪')) icon = 'fas fa-snowflake';
          else if (t.includes('雾')) icon = 'fas fa-smog';
          iconEl.innerHTML = '<i class="' + icon + '"></i>';
        }
      }

      function updateForecastUI(forecasts) {
        var container = document.getElementById('weather-forecast');
        if (!container || !forecasts) return;
        container.innerHTML = '';
        var days = Math.min(4, forecasts.length);
        for (var i = 0; i < days; i++) {
          var f = forecasts[i];
          var dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
          var dayName = dayNames[new Date(f.date).getDay()];
          var t = f.dayWeather.toLowerCase();
          var icon = 'fas fa-sun';
          if (t.includes('雨')) icon = 'fas fa-cloud-rain';
          else if (t.includes('云') || t.includes('阴')) icon = 'fas fa-cloud';
          else if (t.includes('雪')) icon = 'fas fa-snowflake';
          container.innerHTML +=
            '<div class="forecast-item">' +
            '<div class="forecast-day">' + dayName + '</div>' +
            '<div class="forecast-icon"><i class="' + icon + '"></i></div>' +
            '<div class="forecast-temp">' + f.nightTemp + '~' + f.dayTemp + '°</div>' +
            '</div>';
        }
      }

      updateWeather();

      document.getElementById('refresh-weather').addEventListener('click', function () {
        this.classList.add('refreshing');
        updateWeather();
        setTimeout(function () {
          document.getElementById('refresh-weather').classList.remove('refreshing');
        }, 1000);
      });
    });
  } catch (e) {
    console.error('天气功能初始化失败:', e);
    var panel = document.getElementById('weather-panel');
    if (panel) {
      panel.innerHTML =
        '<div style="padding:15px;text-align:center;color:#666;">' +
        '<i class="fas fa-cloud-sun" style="font-size:24px;margin-bottom:8px;display:block;opacity:0.5;"></i>' +
        '<p style="font-size:13px;">天气信息暂不可用</p>' +
        '</div>';
    }
  }
}

/**
 * 分类标签
 */
var currentCategory = '全部';

function initCategoryBar() {
  var bar = document.getElementById('category-bar');
  if (!bar) return;

  var counts = getCategoryCounts();
  bar.innerHTML = '';

  Object.keys(counts).forEach(function (cat) {
    var tag = document.createElement('span');
    tag.className = 'category-tag' + (cat === currentCategory ? ' active' : '');
    tag.textContent = cat + ' (' + counts[cat] + ')';
    tag.onclick = function () {
      filterByCategory(cat);
    };
    bar.appendChild(tag);
  });
}

function filterByCategory(category) {
  currentCategory = category;
  // 更新标签样式
  document.querySelectorAll('.category-tag').forEach(function (tag) {
    tag.classList.toggle('active', tag.textContent.startsWith(category));
  });
  // 过滤标记
  var filtered = getLandmarksByCategory(category);
  renderMarkers(filtered);
  // 飞到合适视野
  if (filtered.length > 0 && map) {
    map.setFitView(null, false, [60, 60, 60, 60]);
  }
}

/**
 * 校园历史时间线
 */
function initTimeline() {
  var track = document.getElementById('timeline-track');
  if (!track || typeof CAMPUS_TIMELINE === 'undefined') return;

  track.innerHTML = '';
  CAMPUS_TIMELINE.forEach(function (item, idx) {
    var node = document.createElement('div');
    node.className = 'timeline-node';
    node.innerHTML =
      '<div class="timeline-dot"></div>' +
      '<div class="timeline-year">' + item.year + '</div>' +
      '<div class="timeline-label">' + item.title + '</div>';
    node.onclick = function () {
      // 高亮当前节点
      track.querySelectorAll('.timeline-node').forEach(function (n) {
        n.classList.remove('active');
      });
      node.classList.add('active');
      // 飞到对应景点
      var landmark = getLandmarkById(item.landmarkId);
      if (landmark) {
        flyToLandmark(landmark);
        showLandmarkDetail(landmark);
      }
    };
    track.appendChild(node);
  });
}

/**
 * 搜索功能
 */
function initSearch() {
  var input = document.getElementById('search-input');
  if (!input) return;

  var resultsDiv = document.getElementById('search-results');

  input.addEventListener('input', function () {
    var query = this.value.trim();
    if (query.length < 1) {
      resultsDiv.innerHTML = '';
      return;
    }
    var results = searchLandmarks(query);
    if (results.length === 0) {
      resultsDiv.innerHTML = '<div class="result-item"><p>未找到相关景点</p></div>';
      return;
    }
    resultsDiv.innerHTML = results
      .map(function (r) {
        return (
          '<div class="result-item" onclick="flyToLandmark(LANDMARKS.find(function(l){return l.id==="' + r.id + '"}))">' +
          '<h4>' + r.name + '</h4>' +
          '<p>' + r.category + ' — ' + r.description.substring(0, 30) + '...</p>' +
          '</div>'
        );
      })
      .join('');
  });
}

/**
 * 显示景点详情面板
 */
function showLandmarkDetail(loc) {
  // 飞到景点
  flyToLandmark(loc);

  // 构建详情 HTML
  var html =
    '<div class="landmark-detail">' +
    '<div class="landmark-detail-header">' +
    '<div class="landmark-detail-title">' + loc.name + '</div>' +
    '<div class="landmark-detail-category">' + loc.category + '</div>' +
    '</div>' +
    '<div class="landmark-detail-desc">' + loc.description + '</div>';

  if (loc.history) {
    html +=
      '<div class="landmark-detail-history">' +
      '<h4><i class="fas fa-book-open"></i> 历史文化</h4>' +
      '<p>' + loc.history + '</p>' +
      '</div>';
  }

  if (loc.tips) {
    html +=
      '<div class="landmark-detail-tips">' +
      '<h4><i class="fas fa-lightbulb"></i> 游览贴士</h4>' +
      '<p>' + loc.tips + '</p>' +
      '</div>';
  }

  if (loc.nearby && loc.nearby.length > 0) {
    html +=
      '<div class="landmark-detail-history">' +
      '<h4><i class="fas fa-map-marker-alt"></i> 附近景点</h4>' +
      '<p>' + loc.nearby.join('、') + '</p>' +
      '</div>';
  }

  html +=
    '<div class="landmark-detail-actions">' +
    '<button class="landmark-action-btn primary" onclick="flyToLandmark(LANDMARKS.find(function(l){return l.id==="' + loc.id + '"}))">' +
    '<i class="fas fa-directions"></i> 导航到这里</button>' +
    '<button class="landmark-action-btn secondary" onclick="openPanorama(LANDMARKS.find(function(l){return l.id==="' + loc.id + '"}))">' +
    '<i class="fas fa-street-view"></i> 查看全景</button>' +
    '<button class="landmark-action-btn secondary" onclick="askAI(\'' + (loc.aiPrompt || '介绍一下这个景点') + '\')">' +
    '<i class="fas fa-robot"></i> AI 问一问</button>' +
    '</div>' +
    '</div>';

  // 插入到搜索结果区域
  var resultsDiv = document.getElementById('search-results');
  if (resultsDiv) resultsDiv.innerHTML = html;
}

/**
 * 向 AI 提问
 */
function askAI(question) {
  // 打开 Coze 聊天窗口并发送问题
  var btn = document.getElementById('coze-assistant-btn');
  if (btn) {
    if (!btn.classList.contains('coze-active')) {
      btn.click();
    }
    // 发送问题到 AI
    if (typeof sendToCoze === 'function') {
      sendToCoze(question);
    }
  }
}
