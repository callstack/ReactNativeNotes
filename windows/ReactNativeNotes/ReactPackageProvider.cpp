#include "pch.h"
#include "ReactPackageProvider.h"
#include "NativeModules.h"

#include "NativeModules/DatabaseHandler.hpp"
#include "NativeModules/NoteWidgetClickHandler.hpp"
#include "NativeModules/Repository/Repository.hpp"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ReactNativeNotes::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
    AddAttributedModules(packageBuilder);
}

} // namespace winrt::ReactNativeNotes::implementation
