import { useQuasar,date } from 'quasar'
export const useDialog = () => {
    const $q = useQuasar()
    const showLoading = () => {
        $q.loading.show({
            message: 'Data sedang diproses, Mohon tunggu...',
            boxClass: 'bg-grey-2 text-grey-9',
            spinnerColor: 'primary'
        })
    }
    
    const hideLoading = () => {
        $q.loading.hide()
    }

    const showDialog = (title,message) => {
        $q.dialog({
            title: title,
            message: message
        })
    }

    const formatDate = (tgl,format) => {
        return date.formatDate(tgl,format,{
            months: ['Januari', 'Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
            monthsShort: ['Jan', 'Feb', 'Mar','Apr','Mei','Jun','Jul','Agus','Sept','Okt','Nov','Des'],
        })
    }

    return {
        showLoading,
        hideLoading,
        showDialog,
        formatDate
    }
}