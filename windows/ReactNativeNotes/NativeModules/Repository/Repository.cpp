#include "pch.h"
#include "Repository.hpp"


namespace winrt::ReactNativeNotes::implementation
{
    void Repository::Create( NoteModel& note ) noexcept
    {
        note.ID( static_cast<unsigned int>(notes.size() + 1) );
        notes.push_back( note );
    }

    NoteModel Repository::Read( const unsigned int ID ) const noexcept
    {
        for( auto it = notes.cbegin(); it != notes.cend(); ++it )
        {
            if( it->ID() == ID )
                return it.operator*();
        }
        return NoteModel();
    }

    void Repository::Update( const NoteModel& note ) noexcept
    {
        for( unsigned int index = 0; index < notes.size(); ++index )
            if( notes.operator[]( index ).ID() == note.ID() )
            {
                notes[index] = note;
                break;
            }
    }

    void Repository::Delete( const unsigned int ID ) noexcept
    {
        auto it = std::find( notes.cbegin(), notes.cend(), Read(ID) );
        notes.erase( it );
    }

    unsigned int Repository::Size() const noexcept
    {
        return notes.size();
    }
}
