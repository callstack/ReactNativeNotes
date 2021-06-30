#pragma once

#include <string>


namespace winrt::ReactNativeNotes::implementation
{
    class NoteModel
    {
    public:
        explicit NoteModel() = default;

        NoteModel( const std::string& title, const bool& isDone, const std::string& post = "" );

        bool operator==( const NoteModel& model ) const;

        std::string Title() const noexcept;
        void Title( std::string ) noexcept;

        std::string Post() const noexcept;
        void Post( std::string ) noexcept;

        std::string ShortPost() const noexcept;

        bool IsDone() const noexcept;
        void IsDone( bool ) noexcept;

    private:
        std::string title;
        std::string post;
        bool isDone;
    };
}
