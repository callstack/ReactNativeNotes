<p align="center">
  <img src="./Resources/img/RNN_README_logo_icon_orange.png"/>
  <h1 align="center"> ReactNativeNotes </h1>
</p>
<p align="center">
    Demo application to create and keep your notes and tasks.
</p>
<p align="center">
    <a href="https://github.com/callstack/ReactNativeNotes/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/callstack/ReactNativeNotes?style=plastic" alt="ReactNativeNotes is released under the MIT license." />
    </a>
    <a href="https://app.circleci.com/pipelines/github/callstack/ReactNativeNotes">
        <img src="https://circleci.com/gh/callstack/ReactNativeNotes/tree/main.svg?style=shield" alt="Build on CircleCI" />
    </a>
</p>


This project is a demonstration application that presents abilites and skills of [Callstack](https://callstack.com) company in creating React Native Windows **desktop** applications.

### **Content** ###
* [Description](#Description)
* [Installation](#Installation)
* [Approach](#Approach)
* [Results](#Results)
* [Conclusions](#Conclusions)

---

## Description ##

The idea behind creating the ReactNativeNotes app was to include features of Windows and React Native Windows [APIs](https://docs.microsoft.com/en-us/windows/uwp/cpp-and-winrt-apis/consume-apis) and to mix both React Native and UWP development.
So beside standard React Native components there is a whole UWP layer which handles all the navigation, animations, and content of a Windows desktop app.
Please check the [Approach](#Approach) section for more details.

**NOTE:** This is the demo application. Its topic is to create and keep your notes and tasks but its purpose is to demonstrate the abilities of React Native Windows. There's no database used for this application, which means that once you close the app, all notes created in this session will be lost.


---
  
## Installation ##

To play with this app
* Make sure to meet all the [System requirements](https://microsoft.github.io/react-native-windows/docs/rnw-dependencies) for React Native Windows development
* Download the released app from [Releases](https://github.com/orgs/callstack/packages?repo_name=ReactNativeNotes) and install it by running *Install.ps1* script with PowerShell

or

* Clone the repository
* Launch the terminal and start the app by the following command:
```
npx react-native run-windows --arch x64
```
(or add `--release --no-launch` to the command line to use the Release version)
This will start all the required tools and launch your app
* alternatively you can launch your app through the Visual Studio by opening the solution file in *\<repo root>/windows/ReactNativeNotes.sln* and launching the Debug configuration.


---

## Approach ##

There are two main layers of the application:
|UWP (C++/WinRT)|RNW (TypeScript)|
|-|-|
|Contains all the XAML Pages of the application.<br>Those Pages can be navigated between using the [`NavigationView`](https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.navigationview?view=winrt-20348).<br>Each Page can host exactly one separate `Component` implemented on the React Native side.|Contains all screens (called Panels) of the application<br>Each screen is a separate root for further navigation and widgets<br>These components act as a View for the application.|


![Architecture diagram](./Resources/README-arch_raw_transparent.png)

So comparing to original React Native Windows where whole application starts from an `index.js` and `App.js`, this solution makes the UWP being a multipile roots hosting not an `index.js`, but many `Components`.


---

## Results ##

The application contains two main screens:

|||
|-|-|
|**Notes screen**<br>where all the notes are available for all the Create/Read/Update/Delete operations | ![](./Resources/CRUD-presentation.gif)|
|**Tasks screen**<br>where all the tasks are available with calendar date picker for specifying the deadline of a task.|![](./Resources/README-tasks.gif)|


---

## Conclusions ##

[React Native Windows](https://github.com/microsoft/react-native-windows) already is a stable framework and is well maintained. There were no issues observed during the development, which would slow down the work or prevent from achieving a goal.
<br/>Creating the desktop app with RNW is not much different than creating an app for mobile using React Native. React Native Windows has the same environment and almost the same tools.

This application was quite an experiment. It was about to check the limits of React Native Windows as a library and its abilities to cooperate with native side.
<br/>And React Native Windows did it just great!

But as this is an experiment, there are some good practices, DOs and DON'Ts that were observed:
| DO | DON'T |
|-|-|
|If you plan to use the native API in your app, consider C# as it has more examples in the documentation than C++|Don't overuse the native side - it will limit the abilities of RNW, make the implementation too distributed and the more native you use, the less cross-platform your app is.|
|When using community modules choose only those with version >= 0.64.x support|Don't spend your time on writing a native module on your own. Most probably it is already available on GitHub.|
|If something is not working check the list of [issues reported to RNW](https://github.com/microsoft/react-native-windows/issues) for a fix or a workaround|Don't test the native side unless it's really required, focus on your JS/TS implementation tests instead.|


---

## Made with ❤️ at Callstack

`@callstack/ReactNativeNotes` is an open source project and will always remain free to use. If you think it's cool, please star it 🌟. [Callstack](https://callstack.com/) is a group of React and React Native geeks, contact us at [hello@callstack.com](mailto:hello@callstack.com) if you need any help with these or just want to say hi!

Like the project? ⚛️ [Join the team](https://callstack.com/careers) who does amazing stuff for clients and drives React Native Open Source! 🔥
