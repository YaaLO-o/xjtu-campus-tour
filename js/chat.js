/**
 * XJTU 智慧校园游 — Coze AI 聊天模块
 */

var cozeClient = null;

document.addEventListener('DOMContentLoaded', function () {
  initCozeChat();
});

/**
 * 发送消息到 Coze AI
 */
function sendToCoze(question) {
  if (cozeClient) {
    try {
      cozeClient.open();
      // 打开后等待片刻再发送问题
      setTimeout(function () {
        if (cozeClient.sendMessage) {
          cozeClient.sendMessage(question);
        }
      }, 500);
    } catch (e) {
      console.error('发送消息失败:', e);
    }
  }
}

function initCozeChat() {
  // 从配置文件读取密钥
  if (typeof CONFIG === 'undefined' || !CONFIG.coze) {
    console.error('Coze 配置未找到，请检查 config.js 文件');
    return;
  }

  try {
    cozeClient = new CozeWebSDK.WebChatClient({
      config: {
        bot_id: CONFIG.coze.botId,
      },
      auth: {
        type: 'token',
        token: CONFIG.coze.token,
      },
      userInfo: {
        id: 'xjtu_visitor',
        url: 'https://www.xjtu.edu.cn/images/logo.png',
        nickname: '交大访客',
      },
      ui: {
        base: {
          icon: 'https://www.xjtu.edu.cn/images/logo.png',
          layout: 'pc',
          lang: 'zh-CN',
          zIndex: 1001,
        },
        chatBot: {
          title: '西安交大校园助手',
          uploadable: true,
          width: 360,
          height: 500,
        },
        asstBtn: {
          isNeed: false,
        },
        footer: {
          isShow: true,
          expressionText: 'Powered by 西安交通大学 & Coze',
          linkvars: {
            name: {
              text: '西安交大',
              link: 'https://www.xjtu.edu.cn',
            },
            name1: {
              text: 'Coze',
              link: 'https://www.coze.com',
            },
          },
        },
      },
    });

    var cozeBtn = document.getElementById('coze-assistant-btn');
    if (cozeBtn) {
      cozeBtn.addEventListener('click', function () {
        cozeBtn.classList.toggle('coze-active');
        if (cozeBtn.classList.contains('coze-active')) {
          cozeClient.open();
          cozeBtn.innerHTML =
            '<i class="fas fa-times"></i><div class="coze-assistant-label">关闭助手</div>';
        } else {
          cozeClient.close();
          cozeBtn.innerHTML =
            '<i class="fas fa-robot"></i><div class="coze-assistant-label">校园智能助手</div>';
        }
      });
    }
  } catch (e) {
    console.error('AI 助手初始化失败:', e);
    var cozeBtn = document.getElementById('coze-assistant-btn');
    if (cozeBtn) {
      cozeBtn.style.display = 'none';
    }
  }
}
