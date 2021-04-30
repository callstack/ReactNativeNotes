#pragma once

#include "ToDoListPage.g.h"

namespace winrt::ReactNativeNotes::implementation
{
    class ToDoListPage : public ToDoListPageT<ToDoListPage>
    {
    public:
        ToDoListPage();
    };
}

namespace winrt::ReactNativeNotes::factory_implementation
{
    class ToDoListPage : public ToDoListPageT<ToDoListPage, implementation::ToDoListPage>
    {
    };
}
