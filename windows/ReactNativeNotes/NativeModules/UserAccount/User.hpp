#pragma once

#include "pch.h"
#include "NativeModules.h"


namespace ReactNativeNotes
{
    REACT_MODULE( User );
    struct User
    {
    public:
        REACT_METHOD( GetName, L"getName" );
        void GetName( React::ReactPromise<React::JSValue> result ) noexcept
        {
            result.Resolve( React::JSValue( name ) );
        }

        REACT_METHOD( SetName, L"setName" );
        void SetName( const std::string& name ) noexcept
        {
            this->name = name;
        }

        REACT_METHOD( GetEmail, L"getEmail" );
        void GetEmail( React::ReactPromise<React::JSValue> result ) noexcept
        {
            result.Resolve( React::JSValue( email ) );
        }

        REACT_METHOD( SetEmail, L"setEmail" );
        void SetEmail( const std::string& email ) noexcept
        {
            this->email = email;
        }

    private:
        std::string name;
        std::string email;
    };
}