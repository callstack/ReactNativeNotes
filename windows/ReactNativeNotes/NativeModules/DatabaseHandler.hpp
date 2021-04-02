#pragma once

#include "pch.h"
#include "NativeModules.h"
#include <string>
#include "Repository/Repository.hpp"
#include <memory>


namespace winrt::ReactNativeNotes::implementation
{
    REACT_MODULE( Database );
    struct Database
    {
        Database()
        {
            data = std::make_unique<Repository>();
        }

        REACT_METHOD( WriteNote, L"writeNote" );
        void WriteNote( const std::string noteTitle, const bool isDone, const std::string noteFullMessage = "" ) noexcept
        {
            data->Create( NoteModel( noteTitle, isDone, noteFullMessage ) );
        }

        REACT_METHOD( GetNoteTitle, L"getNoteTitle" );
        const winrt::hstring GetNoteTitle( const unsigned int ID ) noexcept
        {
            return winrt::to_hstring(data->Read( ID ).Title());
        }

        REACT_METHOD( GetNotePost, L"getNotePost" );
        const winrt::hstring GetNotePost( const unsigned int ID ) noexcept
        {
            return winrt::to_hstring( data->Read( ID ).Post() );
        }

        REACT_METHOD( GetNoteShortPost, L"getNoteShortPost" );
        const winrt::hstring GetNoteShortPost( const unsigned int ID ) noexcept
        {
            return winrt::to_hstring( data->Read( ID ).ShortPost() );
        }

    private:
        std::unique_ptr<Repository> data;
    };
}

