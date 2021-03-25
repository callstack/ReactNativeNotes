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
            auto pageToNavigateTo = winrt::Windows::UI::Xaml::Interop::TypeName
            {
                winrt::to_hstring( L"ReactNativeNotes.NoteWidgetDetailsPage" ),
                winrt::Windows::UI::Xaml::Interop::TypeKind::Custom
            };
            auto navigationAnimation = winrt::Windows::UI::Xaml::Media::Animation::DrillInNavigationTransitionInfo();
            auto& rootFrame = winrt::Windows::UI::Xaml::Window::Current().Content().as<winrt::Windows::UI::Xaml::Controls::Frame>();
            rootFrame.Navigate( pageToNavigateTo, nullptr, navigationAnimation );
        }

        REACT_METHOD( GoToNotesScreen, L"goToNotesScreen" );
        void GoToNotesScreen() noexcept
        {
            auto pageToNavigateTo = winrt::Windows::UI::Xaml::Interop::TypeName
            {
                winrt::to_hstring( L"ReactNativeNotes.NotesPage" ),
                winrt::Windows::UI::Xaml::Interop::TypeKind::Custom
            };
            auto navigationAnimation = winrt::Windows::UI::Xaml::Media::Animation::DrillInNavigationTransitionInfo();
            auto& rootFrame = winrt::Windows::UI::Xaml::Window::Current().Content().as<winrt::Windows::UI::Xaml::Controls::Frame>();
            rootFrame.Navigate( pageToNavigateTo, nullptr, navigationAnimation );
        }
    };
}
