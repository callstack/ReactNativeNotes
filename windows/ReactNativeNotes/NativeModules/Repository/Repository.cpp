#include "pch.h"
#include "Repository.hpp"


namespace winrt::ReactNativeNotes::implementation
{
    void Repository::Create( NoteModel& note ) noexcept
    {
        notes.push_back( note );
    }

    NoteModel Repository::Read( const int index ) const noexcept
    {
        if( index >= notes.size() )
            return NoteModel();
        else
            return notes.at(index);
    }

    void Repository::Update( const NoteModel& note, const unsigned int& index ) noexcept
    {
        if( index < notes.size() )
        {
            notes[index] = note;
        }
    }

    void Repository::Delete( const int index ) noexcept
    {
        notes.erase( notes.cbegin() + index );
    }

    unsigned int Repository::Size() const noexcept
    {
        return notes.size();
    }

    const bool Repository::Exists( const int index ) const noexcept
    {
        return index < notes.size();
    }
}
