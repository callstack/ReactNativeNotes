#include "pch.h"
#include "NoteModel.hpp"


namespace winrt::ReactNativeNotes::implementation
{
    NoteModel::NoteModel( const std::string& title, const bool& isDone, const std::string& post, const unsigned int& ID )
        : title{title}, isDone{isDone}, post{post}, id{ID}
    {
    }

    bool NoteModel::operator==( const NoteModel& model ) const
    {
        return this->id == model.id;
    }

    unsigned int NoteModel::ID() const noexcept
    {
        return id;
    }

    void NoteModel::ID( unsigned int ID ) noexcept
    {
        this->id = ID;
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
        const unsigned int shortMessageTextLength = 100;
        return post.substr( 0, shortMessageTextLength ).append("...");
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
