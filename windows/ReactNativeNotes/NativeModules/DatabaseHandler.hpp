#pragma once

#include "pch.h"
#include "NativeModules.h"
#include <string>
#include "Repository/Repository.hpp"


namespace winrt::ReactNativeNotes::implementation
{
    REACT_MODULE( Database );
    struct Database
    {
        REACT_METHOD( WriteNote, L"writeNote" );
        void WriteNote( const std::string noteTitle, const bool isDone, const std::string noteFullMessage = "" ) noexcept
        {
            Repository::Get()->Create( NoteModel( noteTitle, isDone, noteFullMessage ) );
        }

        REACT_METHOD( GetNoteTitle, L"getNoteTitle" );
        const winrt::hstring GetNoteTitle( const unsigned int ID ) noexcept
        {
            return winrt::to_hstring(Repository::Get()->Read( ID ).Title());
        }

        REACT_METHOD( GetNotePost, L"getNotePost" );
        const winrt::hstring GetNotePost( const unsigned int ID ) noexcept
        {
            return winrt::to_hstring( Repository::Get()->Read( ID ).Post() );
        }

        REACT_METHOD( GetNoteShortPost, L"getNoteShortPost" );
        const winrt::hstring GetNoteShortPost( const unsigned int ID ) noexcept
        {
            return winrt::to_hstring( Repository::Get()->Read( ID ).ShortPost() );
        }

    private:
    };
}

