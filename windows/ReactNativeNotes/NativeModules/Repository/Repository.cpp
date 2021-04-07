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

    NoteModel Repository::Read( const int index ) const noexcept
    {
        if( index >= notes.size() )
            return NoteModel();
        else
            return notes.at(index);
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

    void Repository::Delete( const int index ) noexcept
    {
        notes.erase( notes.cbegin() + index );
    }

    unsigned int Repository::Size() const noexcept
    {
        return notes.size();
    }

    const bool Repository::Exists( const unsigned int ID ) const noexcept
    {
        return std::find_if( notes.cbegin(), notes.cend(), [=]( const NoteModel& n )->bool { return n.ID() == ID; } ) != notes.cend();
    }
    const bool Repository::Exists( const int index ) const noexcept
    {
        return index < notes.size();
    }
}
