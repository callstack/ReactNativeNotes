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
        void ItemInvokedEventHandler( Microsoft::UI::Xaml::Controls::NavigationView const& sender, Microsoft::UI::Xaml::Controls::NavigationViewItemInvokedEventArgs const& args );
        void BackRequestedEventHandler( Microsoft::UI::Xaml::Controls::NavigationView const& sender, Microsoft::UI::Xaml::Controls::NavigationViewBackRequestedEventArgs const& args );

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
