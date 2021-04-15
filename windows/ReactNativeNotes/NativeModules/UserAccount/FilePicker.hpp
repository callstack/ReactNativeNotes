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
        REACT_METHOD( OpenFile, L"openFile" );
        winrt::fire_and_forget OpenFile( React::ReactPromise<React::JSValue> result ) noexcept
        {
            winrt::Windows::Storage::Pickers::FileOpenPicker openPicker;
            openPicker.ViewMode( winrt::Windows::Storage::Pickers::PickerViewMode::Thumbnail );
            openPicker.FileTypeFilter().ReplaceAll( { L".jpg", L".jpeg", L".png" } );
            winrt::Windows::Storage::StorageFile file = co_await openPicker.PickSingleFileAsync();

            if( file != nullptr )
            {
                std::string s = winrt::to_string(file.Path());
                result.Resolve( React::JSValue( s ) );
            }
            else
            {
                result.Reject( L"Couldn't load the selected file!" );
            }
        }
    };
}
