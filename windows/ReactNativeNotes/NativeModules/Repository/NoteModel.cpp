#include "pch.h"
#include "NoteModel.hpp"


namespace winrt::ReactNativeNotes::implementation
{
    NoteModel::NoteModel( const std::string& title, const bool& isDone, const std::string& post )
        : title{title}, isDone{isDone}, post{post}
    {
    }

    bool NoteModel::operator==( const NoteModel& model ) const
    {
        return this->title == model.title;
    }

    std::string NoteModel::Title() const noexcept
    {
        return title;
    }

    void NoteModel::Title( std::string title ) noexcept
    {
        this->title = title;
    }

    std::string NoteModel::Post() const noexcept
    {
        return post;
    }

    void NoteModel::Post( std::string post ) noexcept
    {
        this->post = post;
    }

    std::string NoteModel::ShortPost() const noexcept
    {
        const unsigned int shortMessageTextLength = 97;
        if( post.size() > 100 )
            return post.substr( 0, shortMessageTextLength ).append( "..." );
        else
            return post;
    }

    bool NoteModel::IsDone() const noexcept
    {
        return isDone;
    }

    void NoteModel::IsDone( bool isDone ) noexcept
    {
        this->isDone = isDone;
    }
}
