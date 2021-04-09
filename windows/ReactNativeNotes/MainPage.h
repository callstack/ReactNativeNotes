#pragma once
#include "MainPage.g.h"
#include <winrt/Microsoft.ReactNative.h>
#include <string>


namespace winrt::ReactNativeNotes::implementation
{
    class MainPage : public MainPageT<MainPage>
    {
    public:
        MainPage();
        void ItemInvokedEventHandler( Windows::UI::Xaml::Controls::NavigationView const& sender, Windows::UI::Xaml::Controls::NavigationViewItemInvokedEventArgs const& args );
        void BackRequestedEventHandler( Windows::UI::Xaml::Controls::NavigationView const& sender, Windows::UI::Xaml::Controls::NavigationViewBackRequestedEventArgs const& args );

    private:
        void Navigate( winrt::hstring pageName, const bool hasAnimation = true ) noexcept;
    };
}

namespace winrt::ReactNativeNotes::factory_implementation
{
    class MainPage : public MainPageT<MainPage, implementation::MainPage>
    {
    };
}

