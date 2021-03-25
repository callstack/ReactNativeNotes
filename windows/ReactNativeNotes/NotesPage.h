#pragma once

#include "NotesPage.g.h"
#include <winrt/Microsoft.ReactNative.h>

namespace winrt::ReactNativeNotes::implementation
{
    class NotesPage : public NotesPageT<NotesPage>
    {
    public:
        NotesPage();
    };
}

namespace winrt::ReactNativeNotes::factory_implementation
{
    class NotesPage : public NotesPageT<NotesPage, implementation::NotesPage>
    {
    };
}
