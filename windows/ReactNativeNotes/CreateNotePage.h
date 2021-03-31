#pragma once

#include "CreateNotePage.g.h"

namespace winrt::ReactNativeNotes::implementation
{
    class CreateNotePage : public CreateNotePageT<CreateNotePage>
    {
    public:
        CreateNotePage();
    };
}

namespace winrt::ReactNativeNotes::factory_implementation
{
    class CreateNotePage : public CreateNotePageT<CreateNotePage, implementation::CreateNotePage>
    {
    };
}
