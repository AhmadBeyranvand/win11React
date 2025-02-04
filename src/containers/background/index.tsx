import React, { FormEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Battery from "../../components/shared/Battery";
import { Icon, Image } from "../../utils/general";
import "./back.scss";
import axios from "axios"
import userAvatar from "./userAvatar.jpg"
import { useCookies } from "react-cookie";
import axiosInstance from "../../utils/axiosConfig";

export const Background = () => {
  const wall = useSelector((state) => state.wallpaper);
  const dispatch = useDispatch();
    return (
      <div
        className="background"
        style={{
          backgroundImage: `url(img/wallpaper/${wall.src})`,
        }}
      ></div>
    );
};

export const BootScreen = (props: any) => {
  const dispatch = useDispatch();
  const wall = useSelector((state) => state.wallpaper);
  const [blackout, setBlackOut] = useState(false);

  useEffect(() => {
    if (props.dir < 0) {
      setTimeout(() => {
        console.log("blackout");
        setBlackOut(true);
      }, 4000);
    }
  }, [props.dir]);

  useEffect(() => {
    if (props.dir < 0) {
      if (blackout) {
        if (wall.act == "restart") {
          setTimeout(() => {
            setBlackOut(false);
            setTimeout(() => {
              dispatch({ type: "WALLBOOTED" });
            }, 4000);
          }, 2000);
        }
      }
    }
  }, [blackout]);

  return (
    <div className="bootscreen">
      <div className={blackout ? "hidden" : ""}>
        <Image src="asset/bootlogo" w={180} />
        <div className="mt-48" id="loader">
          <svg
            className="progressRing"
            height={48}
            width={48}
            viewBox="0 0 16 16"
          >
            <circle cx="8px" cy="8px" r="7px"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const LockScreen = (props: any) => {
  const wall = useSelector((state: any) => state.wallpaper);
  const [lock, setLock] = useState(false);
  const [unlocked, setUnLock] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPass] = useState("");
  const [pending, setPending] = useState(false);
  const [loginError, setLoginError] = useState(false)
  const [errorText, setErrorText] = useState("-------------")
  const [windowsTime, setWindowsTime] = useState("")
  const [windowsDate, setWindowsDate] = useState("")
  const [cookie, setCookie] = useCookies()
  const dispatch = useDispatch();

  const stateUsername:FormEventHandler<HTMLInputElement> = (e: Event)=>{
    const target = e.target as HTMLInputElement
    setLoginUsername(target.value)
  }

  const statePassword:FormEventHandler<HTMLInputElement> = (e: Event)=>{
    const target = e.target as HTMLInputElement
    setPass(target.value)
  }

  useEffect(() => {
    setInterval(() => {
      let now: String = new Date().toLocaleTimeString("fa-IR", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        second: "2-digit"
      })
      setWindowsTime(now.toString())
    }, 1000)
    setWindowsDate(
      new Date().toLocaleString("fa-IR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
      })

    )
  })

  const action = (e: any) => {
    var act = e.target.dataset.action,
      payload = e.target.dataset.payload;

    if (act == "splash") setLock(true);
  };

  const proceed = () => {
    setPending(true)
    let url: string = "/api/jwt/login"
    axiosInstance.post(url+"?username="+loginUsername+"&password="+password)
      .then(res => {
        if(res.status == 200){
          if(res.data.token){
            localStorage.setItem("token", res.data.token)
            setCookie("token", res.data.token)
            dispatch({type:"LOGIN", payload:{token:res.data.token, username: "TTTTTTTTTEEEEESSSSTTTT UUUUSSSEERR"}})
            setUnLock(true);
            setTimeout(() => {
              dispatch({ type: "WALLUNLOCK" });
            }, 1000);
          } else {
            alert (" خطا در هنگام دریافت توکن")
          }
        } else {
          alert("وضعیت سرور نا مشخص")
        }
      })
      .catch(err => {
        setErrorText(err.response.data.message)
        setLoginError(true)
      })
      .finally(()=>{
        setPending(false)
      })

  };

  const enterEvent: any = (e: KeyboardEvent) => {
    if (e.key == "Enter") proceed();
  };

  return (
    <div
      className={"lockscreen " + (props.dir == -1 ? "slowfadein" : "")}
      data-unlock={unlocked}
      style={{
        backgroundImage: `url(${`img/wallpaper/lock.jpg`})`,
      }}
      onClick={action}
      data-action="splash"
      data-blur={lock}
    >
      <div className="splashScreen mt-40" data-faded={lock}>
        <div className="text-5xl my-4 font-semibold text-gray-100" dir="rtl">
          {windowsTime}
        </div>
        <div className="text-lg font-medium text-gray-200" dir="rtl">
          {windowsDate}
        </div>
      </div>
      <div className="fadeinScreen" data-faded={!lock} data-unlock={unlocked}>
        <Image
          className="rounded-full overflow-hidden my-6"
          src={userAvatar}
          w={200}
          ext
        />
        <div className="mt-2 text-2xl font-medium text-gray-200 text-center">
          خوش آمدید! لطفا برای ادامه اطلاعات کاربری خود را وارد کنید
        </div>
        {(loginError)
          ?
          <div className="p-8 bg-anim-error flex flex-col justify-center items-center">
            <div className="text-xl font-medium mt-12 text-gray-200 text-center" dir="rtl">
              {errorText}
            </div>
            <div className="flex items-center mt-6 signInBtn" onClick={() => { setLoginError(false) }}>
              امتحان دوباره
            </div>
          </div>
          :
          <>
            <div className="flex flex-col my-6">
              <input name="username" value={loginUsername} onInput={ stateUsername } onChange={action}
                className="loginTextBox"
                data-action="inpass" onKeyDown={enterEvent} placeholder="نام کاربری" />
              <input type="password" value={password} onInput={ statePassword } onChange={action}
                className="loginTextBox"
                data-action="inpass" onKeyDown={enterEvent} placeholder="رمز عبور" />
              {/* <Icon className="-ml-6 handcr" fafa="faArrowRight" width={14}
    color="rgba(170, 170, 170, 0.6)" onClick={proceed} /> */}
            </div>

            <div className="flex items-center mt-6 signInBtn" onClick={proceed}>
              {(pending && !loginError) ?
                <Icon fafa="faSpinner" className="animate-spin" />
                :
                "ورود"
              }
            </div>
          </>
        }

      </div>
      <div className="bottomInfo flex">
        <Icon className="mx-2" src="wifi" ui width={16} invert />
        <Battery invert />
      </div>
    </div>
  );
};
