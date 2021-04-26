#pragma once

#include "pch.h"
#include "NativeModules.h"
#include <algorithm>
#include <string>


namespace ReactNativeNotes
{
    REACT_MODULE( FilePicker );
    struct FilePicker
    {
        REACT_INIT( Initialize );
        void Initialize( const winrt::Microsoft::ReactNative::ReactContext& reactContext ) noexcept
        {
            context = reactContext;
        }

        REACT_METHOD( OpenFile, L"openFile" );
        void OpenFile( React::ReactPromise<React::JSValue> result ) noexcept
        {
            context.UIDispatcher().Post( [this, result{ std::move( result ) }]()->void { LaunchPicker( result ); } );
        }

        winrt::fire_and_forget LaunchPicker( React::ReactPromise<React::JSValue> result ) noexcept
        {
            winrt::Windows::Storage::Pickers::FileOpenPicker openPicker;
            openPicker.ViewMode( winrt::Windows::Storage::Pickers::PickerViewMode::Thumbnail );
            openPicker.FileTypeFilter().ReplaceAll( { L".jpg", L".jpeg", L".png" } );

            try
            {
                winrt::Windows::Storage::StorageFile file = co_await openPicker.PickSingleFileAsync();
                if( file != nullptr )
                {
                    std::string s = winrt::to_string( file.Path() );
                    result.Resolve( React::JSValue( s ) );
                }
                else
                {
                    result.Reject( L"Couldn't load the selected file!" );
                }
            }
            catch( const winrt::hresult_error& e )
            {
                result.Reject( e.message().c_str() );
            }
        }

        winrt::Microsoft::ReactNative::ReactContext context;
    };
}
