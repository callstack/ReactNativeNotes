#pragma once

#include "pch.h"
#include "NativeModules.h"


namespace ReactNativeNotes
{
    REACT_MODULE( NoteWidgetClickHandler );
    struct NoteWidgetClickHandler
    {
        REACT_INIT( Initialize );
        void Initialize( const winrt::Microsoft::ReactNative::ReactContext& reactContext ) noexcept
        {
            context = reactContext;
        }

        REACT_METHOD( OpenWidget, L"openWidget" );
        void OpenWidget( const unsigned int ID ) noexcept
        {
            context.UIDispatcher().Post( [this]()->void { NavigateViaMainFrame( L"ReactNativeNotes.NoteWidgetDetailsPage" ); } );
            openedID = ID;
        }

        REACT_METHOD( GoToNotesScreen, L"goToNotesScreen" );
        void GoToNotesScreen() noexcept
        {
            context.UIDispatcher().Post( [this]()->void { NavigateViaMainFrame( L"ReactNativeNotes.MainPage" ); } );
        }

        REACT_METHOD( OpenedNoteID, L"openedNoteID" );
        void OpenedNoteID( React::ReactPromise<React::JSValue>&& result ) noexcept
        {
            result.Resolve( React::JSValue( openedID ) );
        }


    private:
        winrt::Microsoft::ReactNative::ReactContext context;

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

        unsigned int openedID = 0;
    };
}
