#pragma once

#include "NoteWidgetDetailsPage.g.h"

namespace winrt::ReactNativeNotes::implementation
{
    class NoteWidgetDetailsPage : public NoteWidgetDetailsPageT<NoteWidgetDetailsPage>
    {
    public:
        NoteWidgetDetailsPage();
    };
}

namespace winrt::ReactNativeNotes::factory_implementation
{
    class NoteWidgetDetailsPage : public NoteWidgetDetailsPageT<NoteWidgetDetailsPage, implementation::NoteWidgetDetailsPage>
    {
    };
}
