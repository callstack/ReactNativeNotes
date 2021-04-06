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
        void GetNoteTitle( const int index, React::ReactPromise<React::JSValue>&& result ) noexcept
        {
            result.Resolve( React::JSValue( data->Read( index ).Title() ) );
        }

        REACT_METHOD( GetNotePost, L"getNotePost" );
        const winrt::hstring GetNotePost( const int index ) noexcept
        {
            return winrt::to_hstring( data->Read( index ).Post() );
        }

        REACT_METHOD( GetNoteShortPost, L"getNoteShortPost" );
        void GetNoteShortPost( const int index, React::ReactPromise<React::JSValue>&& result ) noexcept
        {
            result.Resolve( React::JSValue( data->Read( index ).ShortPost() ) );
        }

        REACT_METHOD( GetNumberOfNotes, L"getNumberOfNotes" );
        void GetNumberOfNotes( React::ReactPromise<React::JSValue>&& result ) noexcept
        {
            result.Resolve( React::JSValue( std::to_string(data->Size()) ) );
        }

        REACT_METHOD( DoesIDExists, L"doesIDExists" );
        const bool DoesIDExists( const unsigned int ID ) noexcept
        {
            return data->Exists( ID );
        }

        REACT_METHOD( GetAllNotesIDs, L"getAllNotesIDs" );
        Microsoft::ReactNative::JSValue GetAllNotesIDs() noexcept
        {
            Microsoft::ReactNative::JSValueArray keyArray;
            for( unsigned int i = 0; i < data->Size(); ++i )
            {
                if( data->Exists( i ) )
                    keyArray.push_back( Microsoft::ReactNative::JSValueObject{ { "key", i } } );
            }
            return Microsoft::ReactNative::JSValue( std::move( keyArray ) );
        }

    private:
        std::unique_ptr<Repository> data;
    };
}

