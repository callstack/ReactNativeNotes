#pragma once

#include <string>


namespace winrt::ReactNativeNotes::implementation
{
    class NoteModel
    {
    public:
        explicit NoteModel() = default;

        NoteModel( const std::string& title, const bool& isDone, const std::string& post = "", const unsigned int& ID = 0 );

        bool operator==( const NoteModel& model ) const;

        unsigned int ID() const noexcept;
        void ID( unsigned int ) noexcept;

        std::string Title() const noexcept;
        void Title( std::string ) noexcept;

        std::string Post() const noexcept;
        void Post( std::string ) noexcept;

        std::string ShortPost() const noexcept;

        bool IsDone() const noexcept;
        void IsDone( bool ) noexcept;

    private:
        unsigned int id;
        std::string title;
        std::string post;
        bool isDone;
    };
}
