#pragma once

#include <vector>
#include "NoteModel.hpp"


namespace winrt::ReactNativeNotes::implementation
{
    class Repository
    {
    public:
        Repository( const Repository& ) = delete;
        Repository( Repository&& ) = delete;
        void operator=( const Repository& ) = delete;

        static Repository* Get()
        {
            if( instance == nullptr )
            {
                instance = new Repository();
            }
            return instance;
        }

        void Create( NoteModel& note ) noexcept;

        NoteModel Read( const unsigned int ID ) const noexcept;

        void Update( const NoteModel& note ) noexcept;

        void Delete( const unsigned int ID ) noexcept;

    private:
        Repository() = default;

        std::vector<NoteModel> notes;

        static Repository* instance;
    };
}
