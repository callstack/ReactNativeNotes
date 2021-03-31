#include "pch.h"
#include "ReactPackageProvider.h"
#include "NativeModules.h"

#include "NativeModules/NoteWidgetClickHandler.hpp"
#include "NativeModules/DatabaseHandler.hpp"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ReactNativeNotes::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
    AddAttributedModules(packageBuilder);
}

} // namespace winrt::ReactNativeNotes::implementation
