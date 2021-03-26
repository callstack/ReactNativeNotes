#pragma once

#include "pch.h"
#include "NativeModules.h"


namespace ReactNativeNotes
{
    REACT_MODULE( NoteWidgetClickHandler );
    struct NoteWidgetClickHandler
    {
        REACT_CONSTANT( ID, L"ID" );
        const unsigned int ID;

        REACT_METHOD( OpenWidget, L"openWidget" );
        void OpenWidget( const unsigned int ID ) noexcept
        {
            NavigateViaMainFrame( L"ReactNativeNotes.NoteWidgetDetailsPage" );
        }

        REACT_METHOD( GoToNotesScreen, L"goToNotesScreen" );
        void GoToNotesScreen() noexcept
        {
            NavigateViaMainFrame( L"ReactNativeNotes.MainPage" );
        }


    private:
        void NavigateViaMainFrame( const winrt::hstring pageName )
        {
            auto pageToNavigateTo = winrt::Windows::UI::Xaml::Interop::TypeName
            {
                pageName,
                winrt::Windows::UI::Xaml::Interop::TypeKind::Custom
            };
            auto navigationAnimation = winrt::Windows::UI::Xaml::Media::Animation::DrillInNavigationTransitionInfo();
            auto& rootFrame = winrt::Windows::UI::Xaml::Window::Current().Content().as<winrt::Windows::UI::Xaml::Controls::Frame>();
            rootFrame.Navigate( pageToNavigateTo, nullptr, navigationAnimation );
        }
    };
}
