#pragma once

#include "UserAccountPage.g.h"

namespace winrt::ReactNativeNotes::implementation
{
    class UserAccountPage : public UserAccountPageT<UserAccountPage>
    {
    public:
        UserAccountPage();
    };
}

namespace winrt::ReactNativeNotes::factory_implementation
{
    class UserAccountPage : public UserAccountPageT<UserAccountPage, implementation::UserAccountPage>
    {
    };
}
