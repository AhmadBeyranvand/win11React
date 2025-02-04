import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, ToolBar } from "../../../utils/general";
import "./assets/settings.scss";
import { DatePicker } from "zaman"
import {Select} from "antd"

export const userManager = () => {
  const wnapp = useSelector((state) => state.apps.people);
  const theme: string = useSelector((state) => state.setting.person.theme);
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("userAdd")

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newNationalCode, setNewNationalCode] = useState("");
  const [newBirthDate, setNewBirthDate] = useState(new Date().toString());
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUserLevel, setNewUserLevel] = useState("");
  const [newUserRole, setNewUserRole] = useState(["A2"]);
  const [newUserProfile, setNewUserProfile] = useState(["P1"]);
  const [newUserStatus, setNewUserStatus] = useState("");
  const [roleData,setRoleData] = useState([{label:"AAAA", value:"AAA"},{label:"BBBB", value:"BBBB"}, {label:"CCCC", value:"CCCC"}])

  const [nav, setNav] = useState("")

  const [upmodalOpen, setUpmodalOpen] = useState(false);

  const clearForm = () => {
    setNewFirstName("")
    setNewLastName("")
    setNewNationalCode("")
    setNewBirthDate("")
    setNewEmail("")
    setNewUsername("")
    setNewPassword("")
    setNewUserLevel("")
    setNewUserRole([])
    setNewUserProfile([])
    setNewUserStatus("")
  }

  const enableUser:(userID:number)=>MouseEventHandler<HTMLButtonElement> = (userID) => {
    return alert(userID+ " Enabled!")
  }
  const disableUser:(userID:number)=>MouseEventHandler<HTMLButtonElement> = (userID) => {
    return alert(userID+ " Disabled!")
  }
  const editUser:(userID:number)=>MouseEventHandler<HTMLButtonElement> = (userID) => {
    setActiveMenu("userEdit")
  }

  const historyUser:(userID:number)=>MouseEventHandler<HTMLButtonElement> = (userID) => {
    setActiveMenu("userHistory")
  }
  

  useEffect(()=>{
    if(activeMenu=="userAdd"){
      let arrow:HTMLSpanElement[] = document.getElementsByClassName("ant-select-arrow")
      let selector:HTMLInputElement[] = document.getElementsByClassName("ant-select-selector")
      let close:HTMLInputElement[] = document.getElementsByClassName("ant-select-clear")
      if (arrow && selector && close && close.length==2){
        close[0].style.left = "22px"
        close[1].style.left = "22px"
        arrow[0].style.left = "7px"
        arrow[1].style.left = "7px"
        selector[0].style.border = "none"
        selector[1].style.border = "none"
      }
    } 
  })

  return (
    <div
      className="settingsApp floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="مدیریت کاربران"
      />
      <div className="windowScreen flex flex-col" dir="rtl" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
          <nav className={nav}>
            <div className="nav_top">
              <div className="account" >
                {/* onClick={() => setPage("Accounts")} */}
                <img
                  src="img/custom/people.png"
                  alt=""
                  height={60}
                  width={60}
                />
                <div>
                  <p>مدیریت کاربران</p>
                </div>
              </div>
              <input
                type="search"
                autoComplete=""
                className="search"
                onChange={(e) => { console.log(e.target.value) }}
                placeholder="یک اسم جست‌و‌جو کنید..."
                name="search"
              />
            </div>
            <div className="nav_bottom win11Scroll">
              <div key="userList" onClick={() => { setActiveMenu("userList") }} className={"navLink ".concat((activeMenu == "userList") ? " selected" : "")} >
                <img
                  src={`img/icon/people.png`}
                  alt=""
                  height={16}
                  width={16}
                />
                لیست کاربران
              </div>
              <div key="userAdd" onClick={() => { setActiveMenu("userAdd") }} className={"navLink ".concat((activeMenu == "userAdd") ? " selected" : "")} >
                <img
                  src={`img/settings/Accounts.webp`}
                  alt=""
                  height={16}
                  width={16}
                />
                اضافه کردن کاربر جدید
              </div>
              <div key="printPage" className={"navLink ".concat((activeMenu == "printPage") ? " selected" : "")} >
                <img
                  src={`img/custom/print.png`}
                  alt=""
                  height={16}
                  width={16}
                />
                پرینت اطلاعات
              </div>
              <div key="help" onClick={() => { setActiveMenu("help") }} className={"navLink ".concat((activeMenu == "help") ? " selected" : "")} >
                <img
                  src={`img/icon/feedback.png`}
                  alt=""
                  height={16}
                  width={16}
                />
                راهنمای صفحه
              </div>
              {activeMenu == "userEdit" &&
                <div key="edit" className={"navLink ".concat((activeMenu == "userEdit") ? " selected" : "")} >
                  <img
                    src={`img/custom/user-edit.png`}
                    alt=""
                    height={16}
                    width={16}
                  />
                  ویرایش اطلاعات
                </div>
              }
              {activeMenu == "userHistory" &&
                <div key="history" className={"navLink ".concat((activeMenu == "userHistory") ? " selected" : "")} >
                  <img
                    src={`img/custom/time.png`}
                    alt=""
                    height={16}
                    width={16}
                  />
                  تاریخچه
                </div>
              }

              <div className="marker"></div>
            </div>

          </nav>

          {activeMenu == "userList" &&
            <main key="userManager">
              <h1>مدیریت کاربران</h1>
              <div className="tilesCont win11Scroll">
                <div key="userManagerPage" className="py-5 px-10">
                  <table className={"table-auto w-full " + ((theme === "light") ? "bg-white" : "bg-gray-700")}>
                    <thead>
                      <tr className="p-3">
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>ایمیل</th>
                        <th>نام کاربری</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>احمد</td>
                        <td>بیرانوند</td>
                        <td>ahmad@gmail.com</td>
                        <td>beyranvand</td>
                        <td>
                          <div className="flex justify-center">
                            {(!true) ?
                              <>
                                <div className="status success"> فعال </div>
                                <button className="danger" onClick={()=>{disableUser(1)}}>
                                  <Icon fafa="faMinus" />
                                </button>
                              </> :
                              <>
                                <div className="status danger"> غیر فعال </div>
                                <button className="success" onClick={()=>{enableUser(1)}}>
                                  <Icon fafa="faCheck" />
                                </button></>
                            }
                          </div>
                        </td>
                        <td>
                          <div className="flex xl:flex-row flex-col">
                            <button onClick={()=>{editUser(1)}} className={(theme === "light" ? "text-gray-600" : "text-gray-100")}>ویرایش</button>
                            <button onClick={()=>{historyUser(1)}} className={(theme === "light" ? "text-gray-600" : "text-gray-100")}>تاریخچه ورود</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          }

          {activeMenu == "userAdd" &&
            <main key="userAdd">
              <h1>اضافه کردن کاربر جدید</h1>
              <div className="tilesCont win11Scroll">
                <div key="userAddPage" className="py-5 px-10 flex">
                  <div className="flex flex-col m-5">
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="firstName">نام</label>
                      <input value={newFirstName} onChange={(e) => { setNewFirstName(e.target.value) }} id="firstName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="lastName">نام خانوادگی</label>
                      <input value={newLastName} onChange={(e) => { setNewLastName(e.target.value) }} id="lastName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="username">نام کاربری</label>
                      <input value={newUsername} onChange={(e) => { setNewUsername(e.target.value) }} id="username" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="password">رمز عبور</label>
                      <input value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} id="password" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="nationalCode">کدملی</label>
                      <input value={newNationalCode} onChange={(e) => { setNewNationalCode(e.target.value) }} id="nationalCode" type="text" className="win11input" />
                    </div>
                  </div>
                  <div className="flex flex-col m-5">
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="birthDate">تاریخ تولد</label>
                      <div className="win11input-holder">
                        <DatePicker defaultValue={newBirthDate} id="birthDate" onChange={e => { setNewBirthDate((e.value?.toISOString() || "")) }} round="roundX2" accentColor="#0074ff" />
                      </div>
                      {/* <input onChange={(e) => { setNewLastName(e.target.value) }} id="lastName" type="text" className="win11input" /> */}
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="newEmail">ایمیل</label>
                      <input value={newEmail} onChange={(e) => { setNewEmail(e.target.value) }} id="newEmail" type="email" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="newUserLevel">سطح کاربر</label>
                      <input value={newUserLevel} placeholder="بین ۱ تا ۱۰۰" onChange={(e) => { setNewUserLevel(e.target.value) }} id="newUserLevel" type="number" min={1} max={100} className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="newUserRole">سمت</label>
                      <Select mode="multiple" options={roleData} value={newUserRole} onChange={e=>{setNewUserRole(e)}} allowClear className="win11input w-full ant-select" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="lastName">پروفایل</label>
                      <Select mode="multiple" options={roleData} value={newUserProfile} onChange={e=>{setNewUserProfile(e)}} allowClear className="win11input w-full ant-select" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-7 flex justify-start">
                <button className="win11btn flex items-center" onClick={clearForm} >
                  <img className="mx-2" width={24} height={24} src="img/icon/win/797.png" />
                  بازنویسی
                </button>
                <button disabled className="win11btn flex items-center" >
                  <img className="mx-2" width={24} height={24} src="img/settings/Accounts.webp" />
                  اضافه کردن کاربر جدید
                </button>
              </div>
            </main>
          }

          {activeMenu == "userEdit" &&
            <main key="userEdit">
              <h1>ویرایش کردن کاربر </h1>
              <div className="tilesCont win11Scroll">
                <div key="userEditPage" className="py-5 px-10 flex">
                  <div className="flex flex-col m-5">
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="firstName">نام</label>
                      <input value={newFirstName} onChange={(e) => { setNewFirstName(e.target.value) }} id="firstName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="lastName">نام خانوادگی</label>
                      <input value={newLastName} onChange={(e) => { setNewLastName(e.target.value) }} id="lastName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="username">نام کاربری</label>
                      <input value={newUsername} onChange={(e) => { setNewUsername(e.target.value) }} id="username" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="password">رمز عبور</label>
                      <input value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} id="password" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="nationalCode">کدملی</label>
                      <input value={newNationalCode} onChange={(e) => { setNewNationalCode(e.target.value) }} id="nationalCode" type="text" className="win11input" />
                    </div>
                  </div>
                  <div className="flex flex-col m-5">
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="birthDate">تاریخ تولد</label>
                      <div className="win11input-holder">
                        <DatePicker defaultValue={newBirthDate} id="birthDate" onChange={e => { setNewBirthDate((e.value?.toISOString() || "")) }} round="roundX2" accentColor="#0074ff" />
                      </div>
                      {/* <input onChange={(e) => { setNewLastName(e.target.value) }} id="lastName" type="text" className="win11input" /> */}
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="newEmail">ایمیل</label>
                      <input value={newEmail} onChange={(e) => { setNewEmail(e.target.value) }} id="newEmail" type="email" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="newUserLevel">سطح کاربر</label>
                      <input value={newUserLevel} placeholder="بین ۱ تا ۱۰۰" onChange={(e) => { setNewUserLevel(e.target.value) }} id="newUserLevel" type="number" min={1} max={100} className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="newUserRole">سمت</label>
                      <Select mode="multiple" options={roleData} value={newUserRole} onChange={e=>{setNewUserRole(e)}} allowClear className="win11input w-full ant-select" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="lastName">پروفایل</label>
                      <Select mode="multiple" options={roleData} value={newUserProfile} onChange={e=>{setNewUserProfile(e)}} allowClear className="win11input w-full ant-select" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-7 flex justify-start">
                <button className="win11btn flex items-center" onClick={clearForm} >
                  <img className="mx-2" width={24} height={24} src="img/icon/win/797.png" />
                  بازنویسی
                </button>
                <button disabled className="win11btn flex items-center" >
                  <img className="mx-2" width={24} height={24} src="img/settings/Accounts.webp" />
                   ویرایش اطلاعات
                </button>
              </div>
            </main>
          }

          {activeMenu == "userHistory" &&
            <main key="userHistory">
              <h1>تاریخچه ورود کاربر</h1>
              <div className="tilesCont win11Scroll">
                <div key="userHistoryPage" className="py-5 px-10 flex">
                <table className={"table-auto w-full " + ((theme === "light") ? "bg-white" : "bg-gray-700")}>
                    <thead>
                      <tr className="p-3">
                        <th>تاریخ</th>
                        <th>نوع فعالیت</th>
                        <th>جزئیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>۱۴۰۱/۱۲/۱۳  ۱۲:۳۰:۰۲</td>
                        <td>تغییر نقش کاربری</td>
                        <td>بدون توضیحات</td>
                      </tr>
                      <tr>
                        <td>۱۴۰۱/۱۲/۱۳  ۱۲:۳۰:۰۲</td>
                        <td>تغییر نقش کاربری</td>
                        <td>بدون توضیحات</td>
                      </tr>
                      <tr>
                        <td>۱۴۰۱/۱۲/۱۳  ۱۲:۳۰:۰۲</td>
                        <td>تغییر نقش کاربری</td>
                        <td>بدون توضیحات</td>
                      </tr>
                      <tr>
                        <td>۱۴۰۱/۱۲/۱۳  ۱۲:۳۰:۰۲</td>
                        <td>تغییر نقش کاربری</td>
                        <td>بدون توضیحات</td>
                      </tr>
                      <tr>
                        <td>۱۴۰۱/۱۲/۱۳  ۱۲:۳۰:۰۲</td>
                        <td>تغییر نقش کاربری</td>
                        <td>بدون توضیحات</td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mx-7 flex justify-start">
                
              </div>
            </main>
          }



          {upmodalOpen && (
            <>
              <div className="absolute z-30 bg-black bg-opacity-60 h-full w-full top-0 left-0"></div>

              <div
                className="absolute top-[50%] left-[50%] z-50 rounded"
                style={{
                  transform: `translateX(-50%) translateY(-50%)`,
                  background: `var(--wintheme)`,
                  padding: `1.5rem`,
                }}
              >
                <h1
                  style={{
                    marginBottom: `10px`,
                  }}
                  className="text-2xl font-semibold"
                >
                  {messageTitle}
                </h1>
                <p>
                  {messageText}
                </p>

                <div
                  className="flex"
                  style={{
                    marginTop: `14px`,
                  }}
                >
                  <button
                    style={{
                      padding: "10px",
                      backgroundColor: "var(--clrPrm)",
                      color: "var(--alt-txt)",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      // Clear the cache and reload the page
                      window.location =
                        window.location.href + `?clearCache=${Math.random()}`;
                    }}
                    className="flex-1 rounded border-none hover:opacity-95"
                  >
                    Restart now
                  </button>
                  <button
                    style={{
                      padding: "10px",
                      color: "var(--sat-txt)",
                    }}
                    className="flex-1 rounded border"
                    onClick={() => {
                      setUpmodalOpen(false);
                    }}
                  >
                    Restart later
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="navMenuBtn" onClick={() => setNav(nav ? "" : "open")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 48 48"
              width={24}
              height={24}
            >
              <path d="M5.5 9a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37zm0 13.5a1.5 1.5 0 1 0 0 3h37a1.5 1.5 0 1 0 0-3h-37z" />
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
};
