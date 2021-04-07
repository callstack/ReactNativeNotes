#pragma once

#include <vector>
#include "NoteModel.hpp"


namespace winrt::ReactNativeNotes::implementation
{
    class Repository
    {
    public:
        Repository() = default;

        Repository( const Repository& ) = delete;
        Repository( Repository&& ) = delete;
        void operator=( const Repository& ) = delete;


        void Create( NoteModel& note ) noexcept;

        NoteModel Read( const unsigned int ID ) const noexcept;
        NoteModel Read( const int index ) const noexcept;

        void Update( const NoteModel& note ) noexcept;

        void Delete( const unsigned int ID ) noexcept;
        void Delete( const int index ) noexcept;

        unsigned int Size() const noexcept;

        const bool Exists( const unsigned int ID ) const noexcept;
        const bool Exists( const int index ) const noexcept;

    private:
        std::vector<NoteModel> notes;
    };
}
