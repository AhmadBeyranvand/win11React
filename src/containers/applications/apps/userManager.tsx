import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../../actions";
import { Icon, ToolBar } from "../../../utils/general";
import LangSwitch from "./assets/Langswitch";
import "./assets/settings.scss";

export const userManager = () => {
  const wnapp = useSelector((state) => state.apps.people);
  const theme: string = useSelector((state) => state.setting.person.theme);
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("userAdd")

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newNationalCode, setNewNationalCode] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUserLevel, setNewUserLevel] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserProfile, setNewUserProfile] = useState("");
  const [newUserStatus, setNewUserStatus] = useState("");

  const [nav, setNav] = useState("")

  const [upmodalOpen, setUpmodalOpen] = useState(false);

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
              {activeMenu == "edit" &&
                <div key="edit" className={"navLink ".concat((activeMenu == "edit") ? " selected" : "")} >
                  <img
                    src={`img/custom/user-edit.png`}
                    alt=""
                    height={16}
                    width={16}
                  />
                  ویرایش اطلاعات
                </div>
              }
              {activeMenu == "history" &&
                <div key="history" className={"navLink ".concat((activeMenu == "history") ? " selected" : "")} >
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
                                <button className="danger">
                                  <Icon fafa="faMinus" />
                                </button>
                              </> :
                              <>
                                <div className="status danger"> غیر فعال </div>
                                <button className="success">
                                  <Icon fafa="faCheck" />
                                </button></>
                            }
                          </div>
                        </td>
                        <td>
                          <div className="flex xl:flex-row flex-col">
                            <button className={(theme==="light"?"text-gray-600":"text-gray-100")}>ویرایش</button>
                            <button className={(theme==="light"?"text-gray-600":"text-gray-100")}>تاریخچه ورود</button>
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
                      <input onChange={(e) => { setNewFirstName(e.target.value) }} id="firstName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="lastName">نام خانوادگی</label>
                      <input onChange={(e) => { setNewLastName(e.target.value) }} id="lastName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="firstName">نام کاربری</label>
                      <input onChange={(e) => { setNewFirstName(e.target.value) }} id="firstName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="lastName">رمز عبور</label>
                      <input onChange={(e) => { setNewLastName(e.target.value) }} id="lastName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="firstName">کدملی</label>
                      <input onChange={(e) => { setNewFirstName(e.target.value) }} id="firstName" type="text" className="win11input" />
                    </div>
                  </div>
                  <div className="flex flex-col m-5">
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="lastName">تاریخ تولد </label>
                      <input onChange={(e) => { setNewLastName(e.target.value) }} id="lastName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="firstName">ایمیل</label>
                      <input onChange={(e) => { setNewFirstName(e.target.value) }} id="firstName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="lastName">سطح کاربر</label>
                      <input onChange={(e) => { setNewLastName(e.target.value) }} id="lastName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="firstName">سمت</label>
                      <input onChange={(e) => { setNewFirstName(e.target.value) }} id="firstName" type="text" className="win11input" />
                    </div>
                    <div className="m-4 flex items-center justify-between">
                      <label htmlFor="lastName">پروفایل</label>
                      <input onChange={(e) => { setNewLastName(e.target.value) }} id="lastName" type="text" className="win11input" />
                    </div>
                  </div>
                </div>
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
                  Restart required
                </h1>
                <p>
                  Some changes will not take effect until you restart your
                  device.
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
