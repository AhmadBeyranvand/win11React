import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import "./i18nextConf";
import "./index.scss";
import qr from "./qrcode.png"
import "./utils/axiosConfig"

import ActMenu from "./components/menu";
import {
  BandPane,
  CalnWid,
  DesktopApp,
  SidePane,
  StartMenu,
  WidPane,
} from "./components/start";
import Taskbar from "./components/taskbar";
import { Background, BootScreen, LockScreen } from "./containers/background";

import { loadSettings } from "./actions";
import * as Applications from "./containers/applications";
import * as Drafts from "./containers/applications/draft";
import { useCookies } from "react-cookie";
import axiosInstance from "./utils/axiosConfig";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <meta charSet="UTF-8" />
      <title>404 - یافت نشد</title>
      <script src="/manualAssets/script.js"></script>
      <link rel="stylesheet" href="/manualAssets/style.css" />
      {/* partial:index.partial.html */}
      <div id="page">
        <div id="container">
          <h1>:(</h1>
          <h2>
            سیستم شما با مشکلی مواجه شده است. سرور نمی‌تواند پاسخ مناسبی به درخواست شما بدهد.
            پیشنهاد میکنیم سیستم را ببندید و دوباره اجرا کنید.
            در صورت مشاهده دوباره این صفحه، مدیر سیستم را مطلع سازید
          </h2>
          <h2>
            <span id="percentage">0</span>% ارسال شد
          </h2>
          <div id="details">
            <div id="qr">
              <div id="image">
                <img src={qr} alt="QR Code" />
              </div>
            </div>
            <div id="stopcode">
              <h4>
                برای اطلاعات بیشتر می‌توانید از طریق لینک زیر با مدیر سیستم در ارتباط باشید
                <br />{" "}
                <a href="#">
                https://www.typescriptlang.org/docs/handbook/2/index.html
                </a>{" "}
              </h4>
              <h5>
                در صورتی که مدیر سیستم کد خطا را از شما درخواست کرد، این کد را می‌توانید در اختیار او قرار دهید:
                <br />
                کد خطا: {error.message}
              </h5>
              <button onClick={resetErrorBoundary}>امتحان دوباره</button>
            </div>
          </div>
        </div>
      </div>
      {/* partial */}
    </div>
  );
}

function App() {
  const apps = useSelector((state: {apps:String[]}) => state.apps);
  const wall = useSelector((state: {wallpaper: String[]}) => state.wallpaper);
  const login = useSelector((state: {login: {loginState: boolean, token:string, username: string}}) => state.login);
  const [cookie, setCookie] = useCookies()
  const dispatch = useDispatch();

  const afterMath = (event) => {
    var ess = [
      ["START", "STARTHID"],
      ["BAND", "BANDHIDE"],
      ["PANE", "PANEHIDE"],
      ["WIDG", "WIDGHIDE"],
      ["CALN", "CALNHIDE"],
      ["MENU", "MENUHIDE"],
    ];

    var actionType = "";
    try {
      actionType = event.target.dataset.action || "";
    } catch (err) {}

    var actionType0 = getComputedStyle(event.target).getPropertyValue(
      "--prefix"
    );

    ess.forEach((item, i) => {
      if (!actionType.startsWith(item[0]) && !actionType0.startsWith(item[0])) {
        dispatch({
          type: item[1],
        });
      }
    });
  };

  window.oncontextmenu = (e) => {
    afterMath(e);
    e.preventDefault();
    // dispatch({ type: 'GARBAGE'});
    var data = {
      top: e.clientY,
      left: e.clientX,
    };

    if (e.target.dataset.menu != null) {
      data.menu = e.target.dataset.menu;
      data.attr = e.target.attributes;
      data.dataset = e.target.dataset;
      dispatch({
        type: "MENUSHOW",
        payload: data,
      });
    }
  };

  window.onclick = afterMath;

  window.onload = (e) => {
    dispatch({ type: "WALLBOOTED" });
  };

  useEffect(() => {
    if (!window.onstart) {
      loadSettings();
      window.onstart = setTimeout(() => {
        // console.log("prematurely loading ( ﾉ ﾟｰﾟ)ﾉ");
        dispatch({ type: "WALLBOOTED" });
      }, 5000);
    }
  });

  // useEffect(()=>{
  //   axiosInstance.get("/api/config").then(res=>{
  //     console.info("RECIEVED!")
  //     console.log(res)
  //   })
  // })

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {!wall.booted ? <BootScreen dir={wall.dir} /> : null}
        {wall.locked ? <LockScreen dir={wall.dir} /> : null}
        {/* {(login.loginState)? */}
        { (true)?
        <div className="appwrap">
          <Background />
          <div className="desktop" data-menu="desk">
            <DesktopApp />
            {Object.keys(Applications).map((key, idx) => {
              var WinApp = Applications[key];
              return <WinApp key={idx} />;
            })}
            {Object.keys(apps)
              .filter((x) => x != "hz")
              .map((key) => apps[key])
              .map((app, i) => {
                if (app.pwa) {
                  var WinApp = Drafts[app.data.type];
                  return <WinApp key={i} icon={app.icon} {...app.data} />;
                }
              })}
            <StartMenu />
            <BandPane />
            <SidePane />
            <WidPane />
            <CalnWid />
          </div>
          <Taskbar />
          <ActMenu />
        </div>
        :
        <LockScreen />
        }
      </ErrorBoundary>
    </div>
  );
}

export default App;
