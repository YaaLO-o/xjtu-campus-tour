/**
 * XJTU 智慧校园游 — 地图模块
 * 地图初始化、标记点、信息窗体、范围控制
 */

let map = null;
let markers = [];
let currentInfoWindow = null;
let currentPanorama = null;
let showMessageTimer = null;

/**
 * 初始化地图
 */
function initMap() {
  try {
    map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 15,
      center: [108.983715, 34.246162],
      viewMode: '3D',
      pitch: 45,
      mapStyle: 'amap://styles/b9dfe8aa66119f2e457dc8ad12c3538c',
    });

    // 3D 控制罗盘
    AMap.plugin(['AMap.ControlBar'], function () {
      map.addControl(
        new AMap.ControlBar({
          position: { right: '20px', top: '20px' },
          showControlButton: true,
        })
      );
    });

    // 加载所有景点标记
    renderMarkers(LANDMARKS);

    // 地图范围控制
    initBoundsControl();
  } catch (e) {
    console.error('地图初始化失败:', e);
    var container = document.getElementById('container');
    if (container) {
      container.innerHTML =
        '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:#f5f5f5;color:#666;">' +
        '<i class="fas fa-map-marked-alt" style="font-size:48px;margin-bottom:15px;opacity:0.5;"></i>' +
        '<p style="font-size:16px;margin-bottom:8px;">地图加载失败</p>' +
        '<p style="font-size:13px;opacity:0.7;">请检查网络连接后刷新页面</p>' +
        '<button onclick="location.reload()" style="margin-top:15px;padding:8px 20px;border:none;border-radius:20px;background:#3498db;color:white;cursor:pointer;">重新加载</button>' +
        '</div>';
    }
  }
}

/**
 * 渲染景点标记到地图
 */
function renderMarkers(landmarks) {
  // 清除旧标记
  markers.forEach((m) => {
    m.off('click');
    m.setMap(null);
  });
  markers = [];

  landmarks.forEach((loc) => {
    // 自定义标记样式：带标签的气泡
    var markerContent =
      '<div style="position:relative;text-align:center;">' +
      '<div style="background:linear-gradient(135deg,#3498db,#2c3e50);color:white;padding:4px 10px;border-radius:15px;font-size:11px;font-weight:500;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);cursor:pointer;">' + loc.name + '</div>' +
      '<div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #2c3e50;margin:0 auto;"></div>' +
      '</div>';

    var marker = new AMap.Marker({
      position: loc.position,
      map: map,
      title: loc.name,
      content: markerContent,
      offset: new AMap.Pixel(0, -15),
      extData: loc,
    });

    var content = createInfoWindow(loc);
    var infoWindow = new AMap.InfoWindow({
      isCustom: true,
      content: content,
      offset: new AMap.Pixel(16, -45),
    });

    marker.on('click', function () {
      if (currentInfoWindow) {
        map.clearInfoWindow();
      }
      infoWindow.open(map, marker.getPosition());
      currentInfoWindow = infoWindow;
    });

    markers.push(marker);
  });
}

/**
 * 创建自定义信息窗体
 */
function createInfoWindow(loc) {
  const info = document.createElement('div');
  info.className = 'custom-info input-card content-window-card';
  info.style.width = '350px';

  // 顶部
  const top = document.createElement('div');
  top.className = 'info-top';
  top.innerHTML = `<div>${loc.name}</div><i class="fas fa-times" onclick="closeInfoWindow()" style="cursor:pointer;"></i>`;
  info.appendChild(top);

  // 中部
  const middle = document.createElement('div');
  middle.className = 'info-middle';
  middle.style.backgroundColor = 'white';

  // 图片（优先使用本地图片，无图则隐藏）
  const imgSrc = loc.images && loc.images.length > 0 ? loc.images[0] : '';
  if (imgSrc && !imgSrc.startsWith('http')) {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = loc.name;
    img.onerror = function () { this.style.display = 'none'; };
    middle.appendChild(img);
  }

  // 描述
  const desc = document.createElement('p');
  desc.textContent = loc.description;
  middle.appendChild(desc);

  // 特征标签
  if (loc.features && loc.features.length > 0) {
    const featureContainer = document.createElement('div');
    featureContainer.className = 'info-feature';
    loc.features.forEach(function (feature) {
      const tag = document.createElement('span');
      tag.className = 'feature-tag';
      tag.textContent = feature;
      featureContainer.appendChild(tag);
    });
    middle.appendChild(featureContainer);
  }

  // 查看详情按钮
  const link = document.createElement('a');
  link.href = 'landmarks.html?id=' + loc.id;
  link.className = 'info-link';
  link.textContent = '查看详情';
  middle.appendChild(link);

  // 经纬度
  const coord = document.createElement('p');
  coord.innerHTML =
    '<strong>经纬度：</strong><span class="lnglat">' +
    loc.position[0].toFixed(6) +
    ', ' +
    loc.position[1].toFixed(6) +
    '</span>';
  middle.appendChild(coord);

  info.appendChild(middle);

  // 底部箭头
  const bottom = document.createElement('div');
  bottom.className = 'info-bottom';
  bottom.innerHTML = '<img src="https://webapi.amap.com/images/sharp.png">';
  info.appendChild(bottom);

  return info;
}

/**
 * 关闭信息窗体
 */
function closeInfoWindow() {
  if (map) map.clearInfoWindow();
  currentInfoWindow = null;
}

/**
 * 飞行到指定景点
 */
function flyToLandmark(landmark) {
  if (!landmark || !landmark.position || !map) return;
  map.setZoomAndCenter(17, landmark.position, false, 500);
}

/**
 * 初始化地图范围控制
 */
function initBoundsControl() {
  var bounds = new AMap.Bounds(
    [108.979328, 34.241348],
    [108.998102, 34.260976]
  );

  map.setLimitBounds(bounds);

  var lockBtn = document.getElementById('lock-bounds');
  if (lockBtn) {
    lockBtn.addEventListener('click', function () {
      map.setLimitBounds(bounds);
      map.setBounds(bounds);
      showMessage('已锁定地图显示范围');
    });
  }

  var unlockBtn = document.getElementById('unlock-bounds');
  if (unlockBtn) {
    unlockBtn.addEventListener('click', function () {
      map.clearLimitBounds();
      showMessage('已取消地图范围限制');
    });
  }
}

function showMessage(msg) {
  // 清除旧的定时器
  if (showMessageTimer) {
    clearTimeout(showMessageTimer);
  }

  // 创建通知元素而不是覆盖搜索结果
  var existing = document.getElementById('map-message');
  if (existing) existing.remove();

  var msgDiv = document.createElement('div');
  msgDiv.id = 'map-message';
  msgDiv.style.cssText =
    'position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:white;padding:10px 20px;border-radius:20px;font-size:13px;z-index:100;white-space:nowrap;';
  msgDiv.textContent = msg;

  var container = document.getElementById('container');
  if (container) {
    container.appendChild(msgDiv);
    showMessageTimer = setTimeout(function () {
      msgDiv.remove();
      showMessageTimer = null;
    }, 3000);
  }
}

/**
 * 打开全景视图
 */
function openPanorama(landmark) {
  if (!landmark) return;

  // 销毁旧的全景实例
  if (currentPanorama) {
    currentPanorama = null;
  }

  // 创建全景容器
  var container = document.getElementById('container');
  var existing = document.getElementById('panorama-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'panorama-overlay';
  overlay.style.cssText =
    'position:absolute;top:0;left:0;width:100%;height:100%;z-index:200;background:#000;';

  // 关闭按钮
  var closeBtn = document.createElement('div');
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  closeBtn.style.cssText =
    'position:absolute;top:15px;right:15px;z-index:201;width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,0.6);color:white;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;';
  closeBtn.onclick = function () {
    currentPanorama = null;
    overlay.remove();
  };
  overlay.appendChild(closeBtn);

  // 标题
  var title = document.createElement('div');
  title.textContent = landmark.name + ' — 全景视图';
  title.style.cssText =
    'position:absolute;top:15px;left:15px;z-index:201;color:white;font-size:16px;font-weight:bold;text-shadow:0 2px 8px rgba(0,0,0,0.5);';
  overlay.appendChild(title);

  container.appendChild(overlay);

  // 初始化全景
  try {
    currentPanorama = new AMap.Panorama('panorama-overlay', {
      position: new AMap.LngLat(landmark.position[0], landmark.position[1]),
      zoom: 0,
    });
  } catch (e) {
    // 全景不可用时显示提示
    var fallback = document.createElement('div');
    fallback.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:white;text-align:center;font-size:16px;';
    fallback.innerHTML =
      '<i class="fas fa-camera" style="font-size:48px;margin-bottom:15px;display:block;opacity:0.5;"></i>' +
      '<p>该位置暂无全景数据</p><p style="font-size:13px;opacity:0.7;margin-top:8px;">请尝试其他景点</p>';
    overlay.appendChild(fallback);
  }
}
