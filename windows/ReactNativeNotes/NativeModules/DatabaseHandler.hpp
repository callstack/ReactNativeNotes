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

        REACT_METHOD( UpdateNote, L"updateNote" );
        void UpdateNote( const std::string noteTitle, const std::string noteFullMessage, const unsigned int id ) noexcept
        {
            data->Update( std::move(NoteModel( noteTitle, false, noteFullMessage )), id );
        }

        REACT_METHOD( GetNoteTitle, L"getNoteTitle" );
        void GetNoteTitle( const int index, React::ReactPromise<React::JSValue>&& result ) noexcept
        {
            result.Resolve( React::JSValue( data->Read( index ).Title() ) );
        }

        REACT_METHOD( GetNotePost, L"getNotePost" );
        void GetNotePost( const int index, React::ReactPromise<React::JSValue>&& result ) noexcept
        {
            result.Resolve( React::JSValue( data->Read( index ).Post() ) );
        }

        REACT_METHOD( GetNoteShortPost, L"getNoteShortPost" );
        void GetNoteShortPost( const int index, React::ReactPromise<React::JSValue>&& result ) noexcept
        {
            result.Resolve( React::JSValue( data->Read( index ).ShortPost() ) );
        }

        REACT_METHOD( DeleteNote, L"deleteNote" );
        void DeleteNote( const int index ) noexcept
        {
            data->Delete( index );
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
        void GetAllNotesIDs( React::ReactPromise<React::JSValue>&& result ) noexcept
        {
            Microsoft::ReactNative::JSValueArray keyArray;
            for( unsigned int i = 0; i < data->Size(); ++i )
            {
                if( data->Exists( i ) )
                    keyArray.push_back( Microsoft::ReactNative::JSValueObject{ { "key", i }, { "title", data->Read( i ).Title() }, { "shortMessage", data->Read( i ).ShortPost() } } );
            }
            result.Resolve( Microsoft::ReactNative::JSValue( std::move( keyArray ) ) );
        }

    private:
        std::unique_ptr<Repository> data;
    };
}

